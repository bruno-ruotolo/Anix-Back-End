import { User } from "@prisma/client";
import { Response, Request } from "express";
import animeService from "../service/animeService.js";

export async function animeInfosController(req: Request, res: Response) {
  const userInfos: User = res.locals.token;
  const animeId = req.params.id;
  const animeInfos = await animeService.animeInfosService(
    parseInt(animeId),
    userInfos.id
  );

  res.status(200).send(animeInfos);
}

export async function animeCreateRateController(req: Request, res: Response) {
  const { rate } = req.body;
  const userInfos: User = res.locals.token;
  const animeId = req.params.id;
  await animeService.animeCreateRateService(
    parseInt(animeId),
    userInfos.id,
    rate
  );

  res.sendStatus(201);
}

export async function animeCreateFavoriteController(
  req: Request,
  res: Response
) {
  const userInfos: User = res.locals.token;
  const animeId = req.params.id;
  await animeService.animeCreateFavoriteService(
    parseInt(animeId),
    userInfos.id
  );

  res.sendStatus(201);
}

export async function animeDeleteFavoriteController(
  req: Request,
  res: Response
) {
  const userInfos: User = res.locals.token;
  const animeId = req.params.id;
  await animeService.animeDeleteFavoriteService(
    parseInt(animeId),
    userInfos.id
  );

  res.sendStatus(200);
}

export async function animeCreateStatusController(req: Request, res: Response) {
  const userInfos: User = res.locals.token;
  const { statusId } = req.body;
  const animeId = req.params.id;
  await animeService.animeCreateStatusService(
    parseInt(animeId),
    userInfos.id,
    statusId
  );

  res.sendStatus(201);
}

export async function animeDeleteStatusController(req: Request, res: Response) {
  const userInfos: User = res.locals.token;
  const animeId = req.params.id;
  await animeService.animeDeleteStatusService(parseInt(animeId), userInfos.id);

  res.sendStatus(200);
}
