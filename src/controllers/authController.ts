import { Request, Response } from "express";
import {
  SignIn,
  UserCreateData,
  UserFavoriteGenresCreateData,
} from "../interfaces/createDataInterface.js";

import authService from "../service/authService.js";

export async function signUpController(req: Request, res: Response) {
  const signUpBody: UserCreateData & UserFavoriteGenresCreateData = req.body;
  const {
    email,
    password,
    username,
    image,
    genderId,
    firstGenreId,
    secondGenreId,
    thirdGenreId,
  } = signUpBody;

  const userInformations = { email, password, username, image, genderId };
  const userFavoriteGenres = {
    firstGenreId,
    secondGenreId,
    thirdGenreId,
  };

  await authService.signUpService(userInformations, userFavoriteGenres);

  res.sendStatus(201);
}

export async function signInController(req: Request, res: Response) {
  const signInBody: SignIn = req.body;

  const token = await authService.signInService(signInBody);

  res.status(200).send(token);
}

export async function validateEmailController(req: Request, res: Response) {
  const signUpBody: UserCreateData = req.body;
  const { email } = signUpBody;

  await authService.validateEmail(email);

  res.sendStatus(200);
}

export async function getAllGenresController(req: Request, res: Response) {
  const genres = await authService.getAllGenresService();

  res.status(200).send(genres);
}

export async function getAllGendersController(req: Request, res: Response) {
  const genders = await authService.getAllGendersService();

  res.status(200).send(genders);
}
