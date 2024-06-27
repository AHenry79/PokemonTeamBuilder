/*
  Warnings:

  - You are about to drop the column `stats` on the `Pokemon` table. All the data in the column will be lost.
  - Added the required column `attack` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defense` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hp` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `special_atk` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `special_def` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speed` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "stats",
ADD COLUMN     "attack" INTEGER NOT NULL,
ADD COLUMN     "defense" INTEGER NOT NULL,
ADD COLUMN     "hp" INTEGER NOT NULL,
ADD COLUMN     "special_atk" INTEGER NOT NULL,
ADD COLUMN     "special_def" INTEGER NOT NULL,
ADD COLUMN     "speed" INTEGER NOT NULL;
