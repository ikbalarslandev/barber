-- CreateEnum
CREATE TYPE "ECurrency" AS ENUM ('TRY', 'USD', 'EUR');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "currency" "ECurrency" NOT NULL DEFAULT 'TRY';
