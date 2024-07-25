/*
  Warnings:

  - You are about to drop the column `version_details` on the `MoveOnPokemon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MoveOnPokemon" DROP COLUMN "version_details";

-- CreateTable
CREATE TABLE "VersionDetail" (
    "id" SERIAL NOT NULL,
    "gen" TEXT NOT NULL,
    "learn_method" TEXT NOT NULL,
    "level_learned" INTEGER NOT NULL,
    "moves_on_pokemon_id" INTEGER NOT NULL,

    CONSTRAINT "VersionDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VersionDetail" ADD CONSTRAINT "VersionDetail_moves_on_pokemon_id_fkey" FOREIGN KEY ("moves_on_pokemon_id") REFERENCES "MoveOnPokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
