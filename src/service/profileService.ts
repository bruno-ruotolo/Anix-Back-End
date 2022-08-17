import { User, UserFavoriteAnime, UserStatusAnime } from "@prisma/client";
import profileRepository from "../repositories/profileRepository.js";
import { notFoundError } from "../utils/errorUtil.js";

async function getProfileInfosService(userId: number) {
  const profileInfos = await profileRepository.getProfileByUserId(userId);
  if (!profileInfos) throw notFoundError("User not found");

  const quantityInfos = getQuantity(profileInfos);

  const { id, username, image, UserFavoriteAnime } = profileInfos;
  const returnBody = {
    id,
    username,
    image,
    UserFavoriteAnime,
    ...quantityInfos,
  };

  return returnBody;
}

function getQuantity(
  profileInfos: User & {
    UserFavoriteAnime: (UserFavoriteAnime & {
      anime: {
        image: string;
      };
    })[];
    UserStatusAnime: (UserStatusAnime & {
      anime: {
        episodes: number;
        duration: number;
      };
    })[];
  }
) {
  let episodesNumber = 0;
  let durationTime = 0;
  const animeDoneQuantity = profileInfos.UserStatusAnime?.length;

  profileInfos.UserStatusAnime?.forEach((statusAnime) => {
    const { duration, episodes } = statusAnime.anime;
    episodesNumber += episodes;
    durationTime += duration;
  });

  durationTime = Math.round(durationTime / 60);

  return { animeDoneQuantity, episodesNumber, durationTime };
}
const profileService = { getProfileInfosService };
export default profileService;
