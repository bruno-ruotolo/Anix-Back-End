/*
  Warnings:

  - You are about to drop the `Anime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AnimeGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Gender` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Season` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFavoriteAnime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFavoriteGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRateAnime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserStatusAnime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Year` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Anime" DROP CONSTRAINT "Anime_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "Anime" DROP CONSTRAINT "Anime_yearId_fkey";

-- DropForeignKey
ALTER TABLE "AnimeGenre" DROP CONSTRAINT "AnimeGenre_animeId_fkey";

-- DropForeignKey
ALTER TABLE "AnimeGenre" DROP CONSTRAINT "AnimeGenre_genreId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteAnime" DROP CONSTRAINT "UserFavoriteAnime_animeId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteAnime" DROP CONSTRAINT "UserFavoriteAnime_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteGenre" DROP CONSTRAINT "UserFavoriteGenre_firstGenreId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteGenre" DROP CONSTRAINT "UserFavoriteGenre_secondGenreId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteGenre" DROP CONSTRAINT "UserFavoriteGenre_thirdGenreId_fkey";

-- DropForeignKey
ALTER TABLE "UserRateAnime" DROP CONSTRAINT "UserRateAnime_animeId_fkey";

-- DropForeignKey
ALTER TABLE "UserRateAnime" DROP CONSTRAINT "UserRateAnime_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserStatusAnime" DROP CONSTRAINT "UserStatusAnime_animeId_fkey";

-- DropForeignKey
ALTER TABLE "UserStatusAnime" DROP CONSTRAINT "UserStatusAnime_statusId_fkey";

-- DropForeignKey
ALTER TABLE "UserStatusAnime" DROP CONSTRAINT "UserStatusAnime_userId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_genderId_fkey";

-- DropTable
DROP TABLE "Anime";

-- DropTable
DROP TABLE "AnimeGenre";

-- DropTable
DROP TABLE "Gender";

-- DropTable
DROP TABLE "Genre";

-- DropTable
DROP TABLE "Season";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "Status";

-- DropTable
DROP TABLE "UserFavoriteAnime";

-- DropTable
DROP TABLE "UserFavoriteGenre";

-- DropTable
DROP TABLE "UserRateAnime";

-- DropTable
DROP TABLE "UserStatusAnime";

-- DropTable
DROP TABLE "Year";

-- CreateTable
CREATE TABLE "genders" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "genders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_status_animes" (
    "id" SERIAL NOT NULL,
    "statusId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "animeId" INTEGER NOT NULL,

    CONSTRAINT "user_status_animes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_favorite_genres" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "firstGenreId" INTEGER NOT NULL,
    "secondGenreId" INTEGER NOT NULL,
    "thirdGenreId" INTEGER NOT NULL,

    CONSTRAINT "user_favorite_genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "episodes" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "yearId" INTEGER NOT NULL,
    "seasonId" INTEGER NOT NULL,

    CONSTRAINT "animes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "years" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "years_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seasons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genres" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anime_genre" (
    "id" SERIAL NOT NULL,
    "animeId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "anime_genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_favorites_animes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "animeId" INTEGER NOT NULL,

    CONSTRAINT "user_favorites_animes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_rate_animes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "animeId" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL,

    CONSTRAINT "user_rate_animes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "genders_name_key" ON "genders"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "status_name_key" ON "status"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_status_animes_statusId_userId_animeId_key" ON "user_status_animes"("statusId", "userId", "animeId");

-- CreateIndex
CREATE UNIQUE INDEX "user_favorite_genres_userId_key" ON "user_favorite_genres"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "animes_title_key" ON "animes"("title");

-- CreateIndex
CREATE UNIQUE INDEX "years_year_key" ON "years"("year");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_name_key" ON "seasons"("name");

-- CreateIndex
CREATE UNIQUE INDEX "genres_name_key" ON "genres"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_favorites_animes_userId_animeId_key" ON "user_favorites_animes"("userId", "animeId");

-- CreateIndex
CREATE UNIQUE INDEX "user_rate_animes_userId_animeId_key" ON "user_rate_animes"("userId", "animeId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "genders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_status_animes" ADD CONSTRAINT "user_status_animes_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_status_animes" ADD CONSTRAINT "user_status_animes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_status_animes" ADD CONSTRAINT "user_status_animes_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "animes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorite_genres" ADD CONSTRAINT "user_favorite_genres_firstGenreId_fkey" FOREIGN KEY ("firstGenreId") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorite_genres" ADD CONSTRAINT "user_favorite_genres_secondGenreId_fkey" FOREIGN KEY ("secondGenreId") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorite_genres" ADD CONSTRAINT "user_favorite_genres_thirdGenreId_fkey" FOREIGN KEY ("thirdGenreId") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animes" ADD CONSTRAINT "animes_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animes" ADD CONSTRAINT "animes_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_genre" ADD CONSTRAINT "anime_genre_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "animes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_genre" ADD CONSTRAINT "anime_genre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorites_animes" ADD CONSTRAINT "user_favorites_animes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorites_animes" ADD CONSTRAINT "user_favorites_animes_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "animes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_rate_animes" ADD CONSTRAINT "user_rate_animes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_rate_animes" ADD CONSTRAINT "user_rate_animes_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "animes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
