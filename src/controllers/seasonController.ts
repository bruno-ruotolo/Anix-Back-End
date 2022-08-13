import { Request, Response } from "express";

import seasonService from "../service/seasonService.js";
import utils from "../utils/utils.js";

export async function getSeasonAnimesController(req: Request, res: Response) {
  const currentSeason = utils.getCurrentSeason();
  const animeList = await seasonService.getSeasonAnimesService();

  res.status(200).send(animeList);
}
