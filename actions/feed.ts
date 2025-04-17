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
  // 1. ENTITY FEED
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
  fs.mkdirSync(feedsDir); // <-- Always run this after deletion

  await generateEntityFeed({
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
