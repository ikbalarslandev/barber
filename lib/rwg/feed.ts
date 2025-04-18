import fs from "fs";
import path from "path";
import prisma from "../../prisma";
import { uploadFeeds } from "./sftp";

const generateEntityFeed = async ({
  feedsDir,
  timestamp,
}: {
  feedsDir: string;
  timestamp: number;
}) => {
  const businesses = await prisma.business.findMany();

  const entityFeed = businesses.map((b) => ({
    entity_id: `business-${b.id}`,
    name: b.name,
    location: {
      latitude: b.coordinates[0],
      longitude: b.coordinates[1],
      unstructured_address: b.address,
    },
  }));

  const entityFilename = `entity_${timestamp}.json`;
  fs.writeFileSync(
    path.join(feedsDir, entityFilename),
    JSON.stringify({ data: entityFeed }, null, 2)
  );

  const entityDescriptor = {
    name: "reservewithgoogle.entity",
    generation_timestamp: timestamp,
    data_file: [entityFilename],
  };
  fs.writeFileSync(
    path.join(feedsDir, `entity_${timestamp}.filesetdesc.json`),
    JSON.stringify(entityDescriptor, null, 2)
  );
};

const generateActionFeed = async ({
  feedsDir,
  timestamp,
}: {
  feedsDir: string;
  timestamp: number;
}) => {
  const businesses = await prisma.business.findMany();

  const actionFeed = businesses.map((b) => ({
    entity_id: `business-${b.id}`,
    link_id: `link-${b.id}`,
    url: `https://www.barber.hamampass.com/rezervasyon/${b.id}`,
    actions: [
      {
        appointment_info: {},
      },
    ],
  }));

  const actionFilename = `action_${timestamp}.json`;
  fs.writeFileSync(
    path.join(feedsDir, actionFilename),
    JSON.stringify({ data: actionFeed }, null, 2)
  );

  const actionDescriptor = {
    name: "reservewithgoogle.action.v2",
    generation_timestamp: timestamp,
    data_file: [actionFilename],
  };
  fs.writeFileSync(
    path.join(feedsDir, `action_${timestamp}.filesetdesc.json`),
    JSON.stringify(actionDescriptor, null, 2)
  );
};

const generateServiceFeed = async ({
  feedsDir,
  timestamp,
}: {
  feedsDir: string;
  timestamp: number;
}) => {
  const products = await prisma.product.findMany({
    include: {
      business: true,
    },
  });

  const serviceFeed = products.map((p) => ({
    merchant_id: `business-${p.businessId}`,
    service_id: `service-${p.id}`,
    localized_service_name: {
      value: p.name,
      localized_value: [
        {
          locale: "tr",
          value: p.name,
        },
      ],
    },
    localized_service_category: {
      value: "Genel",
      localized_value: [
        {
          locale: "tr",
          value: "Genel",
        },
      ],
    },
    service_price: {
      price_interpretation: "INTERPRETATION_EXACT",
      min_price: {
        price_micros: p.price * 1000000,
        currency_code: "TRY",
      },
    },
    action_link: [
      {
        url: `https://www.barber.hamampass.com/rezervasyon/${p.id}?productId=${p.id}`,
      },
    ],
    service_duration: {
      duration_interpretation: "INTERPRETATION_NOT_DISPLAYED",
      min_duration_sec: p.duration,
    },
  }));

  const serviceFilename = `service_${timestamp}.json`;
  fs.writeFileSync(
    path.join(feedsDir, serviceFilename),
    JSON.stringify({ data: serviceFeed }, null, 2)
  );

  const serviceDescriptor = {
    name: "glam.service.v0",
    generation_timestamp: timestamp,
    data_file: [serviceFilename],
  };
  fs.writeFileSync(
    path.join(feedsDir, `service_${timestamp}.filesetdesc.json`),
    JSON.stringify(serviceDescriptor, null, 2)
  );
};

const generateFeeds = async () => {
  const isoTimestamp = new Date().toISOString();
  const timestamp = Math.floor(new Date(isoTimestamp).getTime() / 1000);

  const feedsDir = path.join(process.cwd(), "feeds");
  if (fs.existsSync(feedsDir)) {
    fs.rmSync(feedsDir, { recursive: true, force: true });
  }
  fs.mkdirSync(feedsDir);

  await generateEntityFeed({
    feedsDir,
    timestamp,
  });

  await generateActionFeed({
    feedsDir,
    timestamp,
  });

  await generateServiceFeed({
    feedsDir,
    timestamp,
  });

  await prisma.$disconnect();

  await uploadFeeds(feedsDir, "/");
};

generateFeeds().catch((e) => {
  console.error("❌ Error generating feeds:", e);
  prisma.$disconnect();
  process.exit(1);
});
