-- CreateEnum
CREATE TYPE "EStatus" AS ENUM ('PENDING', 'APPROVED');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "status" "EStatus" NOT NULL DEFAULT 'PENDING';
