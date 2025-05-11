import fs from "fs";
import path from "path";
import prisma from "../../prisma";

const generateBusiness = async ({ feedsDir }: { feedsDir: string }) => {
  const businesses = await prisma.business.findMany({
    include: {
      products: true,
    },
  });
  const entityFilename = `business.json`;
  const entityFilePath = path.join(feedsDir, entityFilename);
  const jsonContent = JSON.stringify({ data: businesses }, null, 2);

  // Write and gzip entity file
  fs.writeFileSync(entityFilePath, jsonContent);
};

const generateFeeds = async () => {
  const feedsDir = path.join(process.cwd(), "lib/rwg/seed");
  fs.mkdirSync(feedsDir);

  await generateBusiness({
    feedsDir,
  });

  await prisma.$disconnect();
};

generateFeeds().catch((e) => {
  console.error("❌ Error generating feeds:", e);
  prisma.$disconnect();
  process.exit(1);
});
