import { Anime, AnimeGenre } from "@prisma/client";
import homeRepository from "../repositories/homeRepository.js";

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
  const currentSeason = getCurrentSeason();
  const [season, year] = currentSeason;

  const seasonList = homeRepository.getSeasonList(season, parseInt(year));

  return seasonList;
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

function getCurrentSeason() {
  const actualDate = new Date().toJSON();
  const year = actualDate.slice(0, 4);
  const month = parseInt(actualDate.slice(5, 7));

  if (month >= 1 && month <= 3) {
    return ["Winter", year];
  }

  if (month >= 4 && month <= 6) {
    return ["Spring", year];
  }

  if (month >= 7 && month <= 9) {
    return ["Summer", year];
  }

  if (month >= 10 && month <= 12) {
    return ["Fall", year];
  }
}

const homeService = { forYouService, seasonService };
export default homeService;
