import animeRepository from "../repositories/animeRepository.js";

async function animeInfosService(animeId: number) {
  const animeInfos = await animeRepository.getAnimeByUserId(animeId);

  return animeInfos;
}

const animeService = { animeInfosService };

export default animeService;
