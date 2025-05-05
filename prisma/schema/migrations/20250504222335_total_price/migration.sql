/*
  Warnings:

  - You are about to drop the column `c_email` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `c_name` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `c_phone` on the `Booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "c_email",
DROP COLUMN "c_name",
DROP COLUMN "c_phone",
ADD COLUMN     "currency" "ECurrency" NOT NULL DEFAULT 'TRY',
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_customerId_key" ON "Booking"("customerId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
