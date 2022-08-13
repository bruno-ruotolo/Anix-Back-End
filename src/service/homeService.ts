import { Anime, AnimeGenre } from "@prisma/client";

import homeRepository from "../repositories/homeRepository.js";
import utils from "../utils/utils.js";

async function forYouService(userId: number) {
  const { firstGenreId, secondGenreId, thirdGenreId } =
    await homeRepository.getFavoriteGenresByUserId(userId);

  const animeList = await homeRepository.getAnimesByGenreId(
    firstGenreId,
    secondGenreId,
    thirdGenreId
  );

  const randomAnime = getRandomAnime(animeList);

  return randomAnime;
}

async function seasonService() {
  const currentSeason = utils.getCurrentSeason();
  const [season, year] = currentSeason;

  const seasonList = await homeRepository.getSeasonList(season, parseInt(year));
  return seasonList;
}

async function popularService() {
  const popularList = await homeRepository.getPopularList();
  return popularList;
}

//AUTH FUNCTIONS
async function getRandomAnime(
  arr: (
    | (AnimeGenre & {
        anime: Anime;
      })
    | Anime
  )[]
) {
  if (arr.length === 0) {
    arr = await homeRepository.getAllAnime();
    return { anime: arr[randomIndex(arr.length)] };
  }
  const randomAnime = arr[randomIndex(arr.length)];
  return randomAnime;
}

function randomIndex(arrayLength: number) {
  return Math.floor(Math.random() * arrayLength);
}
const homeService = { forYouService, seasonService, popularService };
export default homeService;
