import animeRepository from "../repositories/animeRepository.js";
import {
  badRequestError,
  conflictError,
  notFoundError,
} from "../utils/errorUtil.js";

async function animeInfosService(animeId: number, userId: number) {
  const animeInfos = await animeRepository.getAnimeByAnimeIdAndUserId(
    animeId,
    userId
  );

  if (!animeInfos) throw notFoundError("Anime Not Found");

  return animeInfos;
}

async function animeCreateRateService(
  animeId: number,
  userId: number,
  rate: number
) {
  const animeInfos = await animeRepository.getAnimeByAnimeIdAndUserId(
    animeId,
    userId
  );
  if (!animeInfos) throw notFoundError("Anime Not Found");

  await animeRepository.createUserRateAnime(animeId, userId, rate);
}

async function animeCreateFavoriteService(animeId: number, userId: number) {
  const animeInfos = await animeRepository.getAnimeByAnimeIdAndUserId(
    animeId,
    userId
  );
  if (!animeInfos) throw notFoundError("Anime Not Found");

  const favoriteAnime =
    await animeRepository.getFavoriteAnimeByUserIdAndAnimeId(animeId, userId);

  if (favoriteAnime) throw conflictError("You've already favorited this anime");

  await animeRepository.createUserFavoriteAnime(animeId, userId);
}

async function animeDeleteFavoriteService(animeId: number, userId: number) {
  const animeInfos = await animeRepository.getAnimeByAnimeIdAndUserId(
    animeId,
    userId
  );
  if (!animeInfos) throw notFoundError("Anime Not Found");

  const favoriteAnime =
    await animeRepository.getFavoriteAnimeByUserIdAndAnimeId(animeId, userId);

  if (!favoriteAnime)
    throw badRequestError("The Anime isn't First Favorited to Unfavorite");

  await animeRepository.deleteUserFavoriteAnime(animeId, userId);
}

async function animeCreateStatusService(
  animeId: number,
  userId: number,
  statusId: number
) {
  const animeInfos = await animeRepository.getAnimeByAnimeIdAndUserId(
    animeId,
    userId
  );
  if (!animeInfos) throw notFoundError("Anime Not Found");

  const statusAnime = await animeRepository.getStatusAnimeByUserIdAndAnimeId(
    animeId,
    userId
  );

  if (statusAnime)
    throw badRequestError("You've already gave a status to this anime");

  await animeRepository.createUserStatusAnime(animeId, userId, statusId);
}

async function animeDeleteStatusService(animeId: number, userId: number) {
  const animeInfos = await animeRepository.getAnimeByAnimeIdAndUserId(
    animeId,
    userId
  );
  if (!animeInfos) throw notFoundError("Anime Not Found");

  const statusAnime = await animeRepository.getStatusAnimeByUserIdAndAnimeId(
    animeId,
    userId
  );

  if (!statusAnime)
    throw badRequestError("The Anime hasn't any status to remove");

  await animeRepository.deleteUserStatusAnime(animeId, userId);
}

const animeService = {
  animeInfosService,
  animeCreateRateService,
  animeCreateFavoriteService,
  animeDeleteFavoriteService,
  animeCreateStatusService,
  animeDeleteStatusService,
};

export default animeService;
