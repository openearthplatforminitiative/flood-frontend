/*
  Warnings:

  - You are about to drop the column `city` on the `Site` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Site` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Site" DROP COLUMN "city",
DROP COLUMN "country";
