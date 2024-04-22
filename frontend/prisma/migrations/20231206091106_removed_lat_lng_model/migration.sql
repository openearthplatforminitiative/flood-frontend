/*
  Warnings:

  - You are about to drop the column `latLngId` on the `Site` table. All the data in the column will be lost.
  - You are about to drop the `LatLng` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lat` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Site` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Site" DROP CONSTRAINT "Site_latLngId_fkey";

-- AlterTable
ALTER TABLE "Site" DROP COLUMN "latLngId",
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "LatLng";
