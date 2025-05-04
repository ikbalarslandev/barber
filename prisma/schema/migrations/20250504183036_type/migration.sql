-- CreateEnum
CREATE TYPE "EType" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "isHistorical" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" "EType" NOT NULL DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "city" SET DEFAULT 'İstanbul';
