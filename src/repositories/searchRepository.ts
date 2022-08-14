import prisma from "../config/db.js";

async function getAnimesByGenreId(genreId: number, inputSearch: string = "") {
  const like = `${inputSearch}%`;
  return await prisma.$queryRaw`
  SELECT a.*, g."genreId"
  FROM 
    "anime_genre" g
    JOIN animes a ON g."animeId" = a.id
    WHERE g."genreId" = ${genreId} AND a.title ILIKE ${like}
  `;
}

async function getAnimesByYearId(yearId: number, inputSearch: string = "") {
  return await prisma.anime.findMany({
    where: { yearId, title: { startsWith: inputSearch, mode: "insensitive" } },
  });
}

async function getAnimesByGenreAndYearId(
  genreId: number,
  yearId: number,
  inputSearch: string = ""
) {
  const like = `${inputSearch}%`;
  return await prisma.$queryRaw`
  SELECT a.*, g."genreId"
  FROM 
    "anime_genre" g
    JOIN animes a ON g."animeId" = a.id
    WHERE g."genreId" = ${genreId} AND a."yearId" = ${yearId} AND a.title ILIKE ${like}`;
}

async function getAnimesByName(inputSearch: string) {
  return await prisma.anime.findMany({
    where: { title: { startsWith: inputSearch, mode: "insensitive" } },
  });
}

async function getAllAnimes() {
  return await prisma.anime.findMany({ orderBy: { title: "asc" } });
}

async function getAllYears() {
  return await prisma.year.findMany({ orderBy: { year: "desc" } });
}

getAnimesByGenreAndYearId;

const searchRepository = {
  getAnimesByGenreId,
  getAnimesByYearId,
  getAllYears,
  getAllAnimes,
  getAnimesByGenreAndYearId,
  getAnimesByName,
};
export default searchRepository;
