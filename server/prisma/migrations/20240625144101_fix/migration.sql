/*
  Warnings:

  - You are about to drop the column `team_ids` on the `User` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Teams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teams" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "team_ids";

-- AddForeignKey
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
