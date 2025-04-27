/*
  Warnings:

  - You are about to drop the column `phone` on the `Business` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Business` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "phone";

-- CreateIndex
CREATE UNIQUE INDEX "Business_name_key" ON "Business"("name");
