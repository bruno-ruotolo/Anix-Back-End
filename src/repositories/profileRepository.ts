import prisma from "../config/db.js";

async function getProfileByUserId(userId: number) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      UserFavoriteAnime: {
        include: {
          anime: {
            select: {
              image: true,
            },
          },
        },
      },
      UserStatusAnime: {
        where: { statusId: 3 },
        include: {
          anime: {
            select: {
              duration: true,
              episodes: true,
            },
          },
        },
      },
    },
  });
}

const profileRepository = { getProfileByUserId };
export default profileRepository;
