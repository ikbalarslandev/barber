-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "blockedHours" TEXT[],
ADD COLUMN     "workingHours" TEXT[] DEFAULT ARRAY['07:30', '00:00']::TEXT[];
