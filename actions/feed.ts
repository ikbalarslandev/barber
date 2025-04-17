import fs from "fs";
import path from "path";
import prisma from "../prisma";

const generateEntityFeed = async ({
  filenameTimestamp,
  feedsDir,
  timestamp,
}: {
  filenameTimestamp: string;
  feedsDir: string;
  timestamp: string;
}) => {
  const businesses = await prisma.business.findMany();

  const entityFeed = businesses.map((b) => ({
    id: `business-${b.id}`,
    name: b.name,
    telephone: b.phone,
  }));

  const entityFilename = `reservewithgoogle.entity-${filenameTimestamp}.json`;
  fs.writeFileSync(
    path.join(feedsDir, entityFilename),
    JSON.stringify(entityFeed, null, 2)
  );

  const entityDescriptor = {
    name: "reservewithgoogle.entity",
    generation_timestamp: timestamp,
    files: [entityFilename],
  };
  fs.writeFileSync(
    path.join(
      feedsDir,
      `reservewithgoogle.entity-${filenameTimestamp}.filesetdesc.json`
    ),
    JSON.stringify(entityDescriptor, null, 2)
  );
};

const generateActionFeed = async ({
  filenameTimestamp,
  feedsDir,
  timestamp,
}: {
  filenameTimestamp: string;
  feedsDir: string;
  timestamp: string;
}) => {
  const businesses = await prisma.business.findMany();

  const actionFeed = businesses.map((b) => ({
    merchant_id: `business-${b.id}`,
    url: `https://www.barber.hamampass.com/rezervasyon/${b.id}`,
    action_link_type: "BOOK",
  }));

  const actionFilename = `reservewithgoogle.action.v2-${filenameTimestamp}.json`;
  fs.writeFileSync(
    path.join(feedsDir, actionFilename),
    JSON.stringify(actionFeed, null, 2)
  );

  const actionDescriptor = {
    name: "reservewithgoogle.action.v2",
    generation_timestamp: timestamp,
    files: [actionFilename],
  };
  fs.writeFileSync(
    path.join(
      feedsDir,
      `reservewithgoogle.action.v2-${filenameTimestamp}.filesetdesc.json`
    ),
    JSON.stringify(actionDescriptor, null, 2)
  );
};

const generateFeeds = async () => {
  const timestamp = new Date().toISOString();
  const filenameTimestamp = timestamp
    .replace(/[-:]/g, "")
    .split(".")[0]
    .slice(0, 13)
    .replace("T", "T");

  const feedsDir = path.join(process.cwd(), "feeds");
  if (fs.existsSync(feedsDir)) {
    fs.rmSync(feedsDir, { recursive: true, force: true });
  }
  fs.mkdirSync(feedsDir);

  await generateEntityFeed({
    filenameTimestamp,
    feedsDir,
    timestamp,
  });

  await generateActionFeed({
    filenameTimestamp,
    feedsDir,
    timestamp,
  });

  await prisma.$disconnect();
};

generateFeeds().catch((e) => {
  console.error("❌ Error generating feeds:", e);
  prisma.$disconnect();
  process.exit(1);
});
