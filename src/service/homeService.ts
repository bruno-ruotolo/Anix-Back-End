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

const homeService = { forYouService };

export default homeService;

function randomIndex(arrayLength: number) {
  return Math.floor(Math.random() * arrayLength);
}
