/*
  Warnings:

  - You are about to drop the column `lasName` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "lasName",
ADD COLUMN     "lastName" TEXT;
