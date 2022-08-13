import { User } from "@prisma/client";
import { Request, Response } from "express";

import profileService from "../service/profileService.js";

export async function getProfileInfosController(req: Request, res: Response) {
  const userInfos: User = res.locals.token;
  const animeList = await profileService.getProfileInfosService(userInfos.id);

  res.status(200).send(animeList);
}
