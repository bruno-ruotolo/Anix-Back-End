import { User } from "@prisma/client";
import { Response, Request } from "express";
import animeService from "../service/animeService.js";

export async function animeInfosController(req: Request, res: Response) {
  const animeId = req.params.id;
  const animeInfos = await animeService.animeInfosService(parseInt(animeId));

  res.status(200).send(animeInfos);
}
