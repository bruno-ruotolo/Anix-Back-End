/*
  Warnings:

  - A unique constraint covering the columns `[userId,animeId]` on the table `user_status_animes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_status_animes_statusId_userId_animeId_key";

-- CreateIndex
CREATE UNIQUE INDEX "user_status_animes_userId_animeId_key" ON "user_status_animes"("userId", "animeId");
