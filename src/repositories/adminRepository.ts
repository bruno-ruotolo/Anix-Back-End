import prisma from "../config/db.js";

import {
  AnimeGenreCreateData,
  AnimeCreateData,
} from "../interfaces/createDataInterface.js";

async function createAnime(animeBody: AnimeCreateData) {
  return await prisma.anime.create({ data: animeBody });
}

async function createGenreAnime(genresMap: AnimeGenreCreateData[]) {
  return await prisma.animeGenre.createMany({ data: genresMap });
}

async function getSeasons() {
  return await prisma.season.findMany();
}

const adminRepository = { createAnime, createGenreAnime, getSeasons };

export default adminRepository;
