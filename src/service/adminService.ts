import { Anime } from "@prisma/client";

import adminRepository from "../repositories/adminRepository.js";
import { unauthorizedError } from "../utils/errorUtil.js";

async function adminCreateAnimeService(
  animeBody: Anime & { genres: number[] },
  admin: string | string[]
) {
  if (admin !== process.env.ADMIN_SECRET_KEY) {
    throw unauthorizedError("You're not authorized to do this");
  }

  const { genres } = animeBody;
  delete animeBody.genres;
  const createdAnime = await adminRepository.createAnime(animeBody);
  const animeId = createdAnime.id;
  const genresMap = genres.map((genreId) => {
    return { animeId, genreId };
  });
  await adminRepository.createGenreAnime(genresMap);
}

const adminService = {
  adminCreateAnimeService,
};

export default adminService;
