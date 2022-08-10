import prisma from "../config/db.js";

async function getAnimeByUserId(id: number) {
  const result = await prisma.anime.findUnique({
    where: { id },
    include: {
      year: true,
      season: true,
    },
  });

  return result;
}

const animeRepository = { getAnimeByUserId };

export default animeRepository;
