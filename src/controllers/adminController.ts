import { Anime } from "@prisma/client";

import { Response, Request } from "express";

import adminService from "../service/adminService.js";

export async function adminCreateAnimeController(req: Request, res: Response) {
  const { admin } = req.headers;

  const animeBody: Anime & { genres: number[] } = req.body;
  await adminService.adminCreateAnimeService(animeBody, admin);

  res.sendStatus(201);
}
