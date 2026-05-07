/*
  Warnings:

  - You are about to drop the column `reservationDate` on the `reservations` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "reservationDate",
ADD COLUMN     "cancellationReason" TEXT,
ADD COLUMN     "cancelledAt" TIMESTAMP(3),
ADD COLUMN     "confirmedAt" TIMESTAMP(3),
ADD COLUMN     "durationMinutes" INTEGER NOT NULL DEFAULT 90,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "restaurants" ADD COLUMN     "defaultReservationDuration" INTEGER NOT NULL DEFAULT 90,
ADD COLUMN     "slotDuration" INTEGER NOT NULL DEFAULT 30;

-- AlterTable
ALTER TABLE "tables" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "minCapacity" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "customers_email_idx" ON "customers"("email");

-- CreateIndex
CREATE INDEX "reservations_restaurantId_startTime_idx" ON "reservations"("restaurantId", "startTime");

-- CreateIndex
CREATE INDEX "reservations_tableId_startTime_endTime_idx" ON "reservations"("tableId", "startTime", "endTime");

-- CreateIndex
CREATE INDEX "reservations_customerId_idx" ON "reservations"("customerId");

-- CreateIndex
CREATE INDEX "reservations_status_idx" ON "reservations"("status");

-- CreateIndex
CREATE INDEX "tables_restaurantId_status_idx" ON "tables"("restaurantId", "status");
