import bcrypt from "bcrypt";

import {
  UserCreateData,
  UserFavoriteGenresCreateData,
} from "../interfaces/createDataInterface.js";
import authRepository from "../repositories/authRepository.js";
import { conflictError, notFoundError } from "../utils/errorUtil.js";

async function signUpService(
  userInformations: UserCreateData,
  userFavoriteGenres: UserFavoriteGenresCreateData
) {
  const { email, genderId, password } = userInformations;
  const { firstGenreId, secondGenreId, thirdGenreId } = userFavoriteGenres;

  await validateEmail(email);
  await validateGender(genderId);
  await validateAnimeGenres(firstGenreId);
  await validateAnimeGenres(secondGenreId);
  await validateAnimeGenres(thirdGenreId);

  const passwordHash = await encryptPassword(password);

  await authRepository.createUser(
    { ...userInformations, password: passwordHash },
    userFavoriteGenres
  );
}

async function validateEmail(email: string) {
  const emailResult = await authRepository.getUserByEmail(email);
  if (emailResult) throw conflictError("This email is already in use");
}

async function validateGender(genderId: number) {
  const genderResult = await authRepository.getGenderById(genderId);
  if (!genderResult) throw notFoundError("Gender Not Found");
}

async function validateAnimeGenres(genreId: number) {
  const userResult = await authRepository.getGenreById(genreId);
  if (!userResult) throw notFoundError("Genre Not Found");
}

async function encryptPassword(password: string) {
  const SALT = 10;
  const passwordHash = bcrypt.hashSync(password, SALT);
  return passwordHash;
}

const authService = { signUpService };

export default authService;
