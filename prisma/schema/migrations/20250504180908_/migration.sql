/*
  Warnings:

  - You are about to drop the column `addressId` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[locationId]` on the table `Business` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_addressId_fkey";

-- DropIndex
DROP INDEX "Business_addressId_key";

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "addressId",
ADD COLUMN     "locationId" TEXT;

-- DropTable
DROP TABLE "Address";

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "coordinates" DOUBLE PRECISION[],
    "address" TEXT NOT NULL DEFAULT '',
    "postalCode" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Business_locationId_key" ON "Business"("locationId");

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
