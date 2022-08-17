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

const adminRepository = { createAnime, createGenreAnime };

export default adminRepository;
