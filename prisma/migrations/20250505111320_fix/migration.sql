/*
  Warnings:

  - You are about to drop the column `status` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "status" "EStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "status";
