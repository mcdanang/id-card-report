-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "hashedIdNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Report_hashedIdNumber_key" ON "Report"("hashedIdNumber");
