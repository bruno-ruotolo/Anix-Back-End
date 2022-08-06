import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  SignIn,
  UserCreateData,
  UserFavoriteGenresCreateData,
} from "../interfaces/createDataInterface.js";
import authRepository from "../repositories/authRepository.js";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtil.js";
import utils from "../utils/utils.js";

//SERVICES
async function signUpService(
  userInformations: UserCreateData,
  userFavoriteGenres: UserFavoriteGenresCreateData
) {
  const { email, genderId, password } = userInformations;
  const { firstGenreId, secondGenreId, thirdGenreId } = userFavoriteGenres;

  await validateGender(genderId);
  await validateAnimeGenres(firstGenreId);
  await validateAnimeGenres(secondGenreId);
  await validateAnimeGenres(thirdGenreId);

  const passwordHash = await utils.encryptPassword(password);

  await authRepository.createUser(
    { ...userInformations, password: passwordHash },
    userFavoriteGenres
  );
}

async function signInService(signInBody: SignIn) {
  const { email, password } = signInBody;

  const userResult = await checkEmailExist(email);
  await decryptPassword(password, userResult.password);
  const token = await generateJWTToken(userResult);

  await authRepository.createSession(userResult.id, token);
  return token;
}

async function getAllGenresService() {
  return await authRepository.getAllGenres();
}

async function getAllGendersService() {
  return await authRepository.getAllGenders();
}

async function validateEmail(email: string) {
  const emailResult = await authRepository.getUserByEmail(email);
  if (emailResult) throw conflictError("This email is already in use");
}

// AUX FUNCTIONS
async function validateGender(genderId: number) {
  const genderResult = await authRepository.getGenderById(genderId);
  if (!genderResult) throw notFoundError("Gender Not Found");
}

async function validateAnimeGenres(genreId: number) {
  const userResult = await authRepository.getGenreById(genreId);
  if (!userResult) throw notFoundError("Genre Not Found");
}

async function decryptPassword(password: string, passwordHash: string) {
  if (!bcrypt.compareSync(password, passwordHash)) {
    throw unauthorizedError("Username/Password is not valid");
  }
}

async function checkEmailExist(email: string) {
  const userResult = await authRepository.getUserByEmail(email);

  if (!userResult) throw unauthorizedError("Username/Password is not valid");
  return userResult;
}

async function generateJWTToken(userResult: User) {
  const { id, email, username, image } = userResult;
  const tokenBody = { id, email, username, image };
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  const EXPIRATION_DATE = { expiresIn: "2d" };

  const token = jwt.sign(tokenBody, JWT_SECRET_KEY, EXPIRATION_DATE);

  return token;
}

const authService = {
  signUpService,
  getAllGenresService,
  getAllGendersService,
  validateEmail,
  signInService,
};

export default authService;
