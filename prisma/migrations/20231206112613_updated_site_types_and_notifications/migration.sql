/*
  Warnings:

  - You are about to drop the column `type` on the `Site` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Site" DROP COLUMN "type",
ADD COLUMN     "types" TEXT[];
