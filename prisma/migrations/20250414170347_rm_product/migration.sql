/*
  Warnings:

  - You are about to drop the `_BookingToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BookingToProduct" DROP CONSTRAINT "_BookingToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookingToProduct" DROP CONSTRAINT "_BookingToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "products" TEXT[];

-- DropTable
DROP TABLE "_BookingToProduct";
