/*
  Warnings:

  - You are about to drop the column `level` on the `Wish` table. All the data in the column will be lost.
  - Added the required column `rating` to the `Wish` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wish" RENAME COLUMN "level" TO "rating";

