import prisma from "../config/db.js";

async function getStatusByName(status: string) {
  return await prisma.status.findFirst({
    where: { name: { equals: status, mode: "insensitive" } },
  });
}

async function getAnimeByStatusIdAndUserId(statusId: number, userId: number) {
  const result = await prisma.userStatusAnime.findMany({
    where: { statusId, userId },
    include: {
      anime: true,
    },
  });

  return result;
}

const animeUserStatusRepository = {
  getStatusByName,
  getAnimeByStatusIdAndUserId,
};
export default animeUserStatusRepository;
