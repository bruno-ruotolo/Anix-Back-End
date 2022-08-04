import { Request, Response } from "express";
import {
  UserCreateData,
  UserFavoriteGenresCreateData,
} from "../interfaces/createDataInterface.js";

import authService from "../service/authService.js";

export async function singUpController(req: Request, res: Response) {
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
