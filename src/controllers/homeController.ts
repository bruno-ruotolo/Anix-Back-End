import { User } from "@prisma/client";
import { Response, Request } from "express";
import homeService from "../service/homeService.js";

export async function forYouController(req: Request, res: Response) {
  const userInfos: User = res.locals.token;
  const forYouList = await homeService.forYouService(userInfos.id);

  res.status(200).send(forYouList);
}

export async function seasonController(req: Request, res: Response) {
  const seasonList = await homeService.seasonService();

  res.status(200).send(seasonList);
}
