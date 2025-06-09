import fs from "fs";
import path from "path";
import prisma from "../../prisma";
import { uploadFeeds } from "./sftp";
import zlib from "zlib";
import { promisify } from "util";

const gzip = promisify(zlib.gzip);

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
      address: {
        country: "TR",
        locality: "İstanbul",
        postal_code: b.postalCode,
        street_address: b.address,
      },
    },
  }));

  const entityFilename = `entity_${timestamp}.json`;
  const entityFilePath = path.join(feedsDir, entityFilename);
  const jsonContent = JSON.stringify({ data: entityFeed }, null, 2);

  // Write and gzip entity file
  fs.writeFileSync(entityFilePath, jsonContent);
  const entityGzippedContent = await gzip(jsonContent);
  const gzippedEntityFilename = `${entityFilename}.gz`; // e.g. entity_123456.json.gz
  const gzippedEntityPath = path.join(feedsDir, gzippedEntityFilename);
  fs.writeFileSync(gzippedEntityPath, entityGzippedContent);

  // remove original .json
  //fs.unlinkSync(entityFilePath);

  // Create descriptor and gzip it
  const entityDescriptor = {
    name: "reservewithgoogle.entity",
    generation_timestamp: timestamp,
    data_file: [gzippedEntityFilename],
  };

  const descriptorFilename = `entity_${timestamp}.filesetdesc.json`;
  const descriptorFilePath = path.join(feedsDir, descriptorFilename);
  const descriptorContent = JSON.stringify(entityDescriptor, null, 2);

  fs.writeFileSync(descriptorFilePath, descriptorContent);
  const gzippedDescriptorContent = await gzip(descriptorContent);
  const gzippedDescriptorFilename = `${descriptorFilename}.gz`; // e.g. entity_123456.filesetdesc.json.gz
  const gzippedDescriptorPath = path.join(feedsDir, gzippedDescriptorFilename);
  fs.writeFileSync(gzippedDescriptorPath, gzippedDescriptorContent);
  // remove original descriptor
  //  fs.unlinkSync(descriptorFilePath);
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
    url: `https://www.single.hamampass.com/rezervasyon/${b.id}`,
    actions: [
      {
        appointment_info: {},
      },
    ],
  }));

  // Write action feed
  const actionFilename = `action_${timestamp}.json`;
  const actionFilePath = path.join(feedsDir, actionFilename);
  const jsonContent = JSON.stringify({ data: actionFeed }, null, 2);
  fs.writeFileSync(actionFilePath, jsonContent);

  // Gzip feed
  const gzippedActionContent = await gzip(jsonContent);
  const gzippedActionFilename = `${actionFilename}.gz`; // action_123.json.gz
  const gzippedActionPath = path.join(feedsDir, gzippedActionFilename);
  fs.writeFileSync(gzippedActionPath, gzippedActionContent);
  // Remove original .json
  // fs.unlinkSync(actionFilePath);

  // Create and gzip descriptor
  const actionDescriptor = {
    name: "reservewithgoogle.action.v2",
    generation_timestamp: timestamp,
    data_file: [gzippedActionFilename],
  };
  const descriptorFilename = `action_${timestamp}.filesetdesc.json`;
  const descriptorFilePath = path.join(feedsDir, descriptorFilename);
  const descriptorContent = JSON.stringify(actionDescriptor, null, 2);
  fs.writeFileSync(descriptorFilePath, descriptorContent);

  const gzippedDescriptorContent = await gzip(descriptorContent);
  const gzippedDescriptorFilename = `${descriptorFilename}.gz`;
  const gzippedDescriptorPath = path.join(feedsDir, gzippedDescriptorFilename);
  fs.writeFileSync(gzippedDescriptorPath, gzippedDescriptorContent);
  // delete original descriptor
  // fs.unlinkSync(descriptorFilePath);
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
    localized_service_description: {
      value: p.desc,
      localized_value: [
        {
          locale: "tr",
          value: p.desc,
        },
      ],
    },
    service_price: {
      price_interpretation: "INTERPRETATION_EXACT",
      min_price: {
        price_micros: p.price * 1000000,
        currency_code: `${p.currency}`,
      },
    },
    action_link: [
      {
        url: `https://www.single.hamampass.com/rezervasyon/${p.businessId}?productId=${p.id}`,
      },
    ],
    service_duration: {
      duration_interpretation: "INTERPRETATION_NOT_DISPLAYED",
      min_duration_sec: 0,
    },
    ranking_hint: {
      score: 1,
    },
  }));

  // Write service JSON file
  const serviceFilename = `service_${timestamp}.json`;
  const serviceFilePath = path.join(feedsDir, serviceFilename);
  const jsonContent = JSON.stringify({ data: serviceFeed }, null, 2);
  fs.writeFileSync(serviceFilePath, jsonContent);

  // Gzip it
  const gzippedServiceContent = await gzip(jsonContent);
  const gzippedServiceFilename = `${serviceFilename}.gz`;
  const gzippedServicePath = path.join(feedsDir, gzippedServiceFilename);
  fs.writeFileSync(gzippedServicePath, gzippedServiceContent);
  // Remove original .json
  // fs.unlinkSync(serviceFilePath);

  // Write descriptor
  const serviceDescriptor = {
    name: "glam.service.v0",
    generation_timestamp: timestamp,
    data_file: [gzippedServiceFilename],
  };
  const descriptorFilename = `service_${timestamp}.filesetdesc.json`;
  const descriptorFilePath = path.join(feedsDir, descriptorFilename);
  const descriptorContent = JSON.stringify(serviceDescriptor, null, 2);
  fs.writeFileSync(descriptorFilePath, descriptorContent);

  // Gzip descriptor
  const gzippedDescriptorContent = await gzip(descriptorContent);
  const gzippedDescriptorFilename = `${descriptorFilename}.gz`;
  const gzippedDescriptorPath = path.join(feedsDir, gzippedDescriptorFilename);
  fs.writeFileSync(gzippedDescriptorPath, gzippedDescriptorContent);
  // Remove original descriptor
  // fs.unlinkSync(descriptorFilePath);
};

const generateFeeds = async () => {
  const isoTimestamp = new Date().toISOString();
  const timestamp = Math.floor(new Date(isoTimestamp).getTime() / 1000);

  const feedsDir = path.join(process.cwd(), "lib/rwg/feeds");
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

  await uploadFeeds(feedsDir);
};

generateFeeds().catch((e) => {
  console.error("❌ Error generating feeds:", e);
  prisma.$disconnect();
  process.exit(1);
});
