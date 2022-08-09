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

const homeRepository = {
  getFavoriteGenresByUserId,
  getAnimesByGenreId,
  getAllAnime,
};
export default homeRepository;
