import prisma from "../config/db.js";

async function getFavoriteGenresByUserId(id: number) {
  const result = await prisma.userFavoriteGenre.findUnique({
    where: { userId: id },
  });

  return result;
}

async function getAnimesByGenreId(
  firstGenreId: number,
  secondGenreId: number,
  thirdGenreId: number
) {
  return await prisma.animeGenre.findMany({
    where: {
      OR: [
        { genreId: firstGenreId },
        { genreId: secondGenreId },
        { genreId: thirdGenreId },
      ],
    },
    include: {
      anime: true,
    },
  });
}

async function getAllAnime() {
  return await prisma.anime.findMany();
}

async function getSeasonList(season: string, year: number) {
  return await prisma.anime.findMany({
    include: {
      year: true,
      season: true,
    },
    where: { year: { year }, season: { name: season } },
    orderBy: { title: "asc" },
  });
}

async function getPopularList() {
  return await prisma.anime.findMany({
    include: {
      _count: { select: { UserFavoriteAnime: true } },
    },
    orderBy: {
      UserFavoriteAnime: {
        _count: "desc",
      },
    },
  });
}

const homeRepository = {
  getFavoriteGenresByUserId,
  getAnimesByGenreId,
  getAllAnime,
  getSeasonList,
  getPopularList,
};
export default homeRepository;
