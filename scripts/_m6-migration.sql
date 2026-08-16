-- CreateTable
CREATE TABLE "VendorQuote" (
    "id" TEXT NOT NULL,
    "quoteNumber" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "vendorCost" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'SAR',
    "fileRef" TEXT,
    "validUntil" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'Requested',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VendorQuote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "contactName" TEXT,
    "contactEmail" TEXT,
    "company" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "platform" TEXT,
    "meetingLink" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Scheduled',
    "source" TEXT NOT NULL DEFAULT 'email',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VendorQuote_quoteNumber_key" ON "VendorQuote"("quoteNumber");

-- AddForeignKey
ALTER TABLE "VendorQuote" ADD CONSTRAINT "VendorQuote_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "QuoteRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorQuote" ADD CONSTRAINT "VendorQuote_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

