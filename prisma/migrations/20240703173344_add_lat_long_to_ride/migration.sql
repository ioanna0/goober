/*
  Warnings:

  - Added the required column `dropoffLat` to the `Ride` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dropoffLng` to the `Ride` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupLat` to the `Ride` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupLng` to the `Ride` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ride" ADD COLUMN     "dropoffLat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "dropoffLng" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pickupLat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pickupLng" DOUBLE PRECISION NOT NULL;
