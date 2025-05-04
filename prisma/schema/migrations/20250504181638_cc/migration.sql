-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "city" TEXT NOT NULL DEFAULT 'Istanbul',
ADD COLUMN     "countryCode" TEXT NOT NULL DEFAULT 'TR';
