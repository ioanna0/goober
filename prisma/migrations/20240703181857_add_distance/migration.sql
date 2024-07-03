/*
  Warnings:

  - Made the column `distance` on table `Ride` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Ride" ALTER COLUMN "distance" SET NOT NULL,
ALTER COLUMN "distance" DROP DEFAULT;
