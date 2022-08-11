import prisma from "../config/db.js";

async function getAnimeByAnimeIdAndUserId(animeId: number, userId: number) {
  const result = await prisma.anime.findUnique({
    include: {
      UserStatusAnime: {
        select: {
          userId: true,
          status: {
            select: { name: true },
          },
        },
        where: { userId },
      },
      UserRateAnime: {
        select: {
          rate: true,
        },
        where: { userId },
      },
      UserFavoriteAnime: {
        where: { userId },
      },
    },
    where: { id: animeId },
  });

  const avgRate = await prisma.userRateAnime.aggregate({
    _avg: {
      rate: true,
    },
    where: { animeId },
  });

  if (!result) return false;

  return { ...result, avgRate: avgRate._avg.rate };
}

async function getRateAnimeByUserIdAndAnimeId(animeId: number, userId: number) {
  const result = await prisma.userRateAnime.findFirst({
    where: { animeId, userId },
  });

  return result;
}

async function createUserRateAnime(
  animeId: number,
  userId: number,
  rate: number
) {
  await prisma.userRateAnime.upsert({
    where: { userId_animeId: { animeId, userId } },
    update: {
      rate,
    },
    create: {
      animeId,
      userId,
      rate,
    },
  });
}

async function getFavoriteAnimeByUserIdAndAnimeId(
  animeId: number,
  userId: number
) {
  const result = await prisma.userFavoriteAnime.findUnique({
    where: { userId_animeId: { userId, animeId } },
  });

  return result;
}

async function createUserFavoriteAnime(animeId: number, userId: number) {
  await prisma.userFavoriteAnime.create({ data: { userId, animeId } });
}

async function deleteUserFavoriteAnime(animeId: number, userId: number) {
  await prisma.userFavoriteAnime.delete({
    where: { userId_animeId: { userId, animeId } },
  });
}

async function createUserStatusAnime(
  animeId: number,
  userId: number,
  statusId: number
) {
  await prisma.userStatusAnime.create({
    data: { userId, animeId, statusId },
  });
}

async function deleteUserStatusAnime(animeId: number, userId: number) {
  await prisma.userStatusAnime.delete({
    where: { userId_animeId: { animeId, userId } },
  });
}

async function getStatusAnimeByUserIdAndAnimeId(
  animeId: number,
  userId: number
) {
  const result = await prisma.userStatusAnime.findUnique({
    where: { userId_animeId: { animeId, userId } },
  });

  return result;
}

const animeRepository = {
  getAnimeByAnimeIdAndUserId,
  createUserRateAnime,
  getRateAnimeByUserIdAndAnimeId,
  createUserFavoriteAnime,
  deleteUserFavoriteAnime,
  createUserStatusAnime,
  getFavoriteAnimeByUserIdAndAnimeId,
  deleteUserStatusAnime,
  getStatusAnimeByUserIdAndAnimeId,
};
export default animeRepository;
