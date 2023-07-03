/*
  Warnings:

  - A unique constraint covering the columns `[applierId]` on the table `Job` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Job_applierId_key" ON "Job"("applierId");
