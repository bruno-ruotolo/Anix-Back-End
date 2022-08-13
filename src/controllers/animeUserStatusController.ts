import { User } from "@prisma/client";
import { Request, Response } from "express";

import animeUserStatusService from "../service/animeUserStatusService.js";

export async function getAnimeUserStatusController(
  req: Request,
  res: Response
) {
  const userInfos: User = res.locals.token;
  const queryStatus = req.query.s;
  const animeList = await animeUserStatusService.getAnimesByStatus(
    userInfos.id,
    queryStatus
  );

  res.status(200).send(animeList);
}
