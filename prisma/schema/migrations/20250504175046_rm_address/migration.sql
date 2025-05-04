-- CreateEnum
CREATE TYPE "ECurrency" AS ENUM ('TRY', 'USD', 'EUR');

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "hour" TEXT NOT NULL,
    "c_name" TEXT NOT NULL,
    "c_phone" TEXT NOT NULL,
    "c_email" TEXT NOT NULL,
    "products" TEXT[],
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "workingHours" TEXT[] DEFAULT ARRAY['07:30', '00:00']::TEXT[],
    "blockedHours" TEXT[],
    "addressId" TEXT,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "coordinates" DOUBLE PRECISION[],
    "address" TEXT NOT NULL DEFAULT '',
    "postalCode" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL DEFAULT 'İşletmede bulunan tüm fiziksel imkanlardan faydalanabilirsiniz. fakat herhangi bir hizmet bu paket dahilinde değildir. örnek olarak masaj, kese, v.b. hizmetler bu pakete dahil değildir.',
    "duration" INTEGER NOT NULL DEFAULT 30,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" "ECurrency" NOT NULL DEFAULT 'TRY',
    "businessId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Business_name_key" ON "Business"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Business_email_key" ON "Business"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Business_addressId_key" ON "Business"("addressId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
