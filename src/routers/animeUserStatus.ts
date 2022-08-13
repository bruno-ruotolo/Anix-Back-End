import { Router } from "express";
import { getAnimeUserStatusController } from "../controllers/animeUserStatusController.js";
import authTokenMiddleware from "../middlewares/authTokenMiddleware.js";

const animeUserStatus = Router();

animeUserStatus.get(
  "/user/animes",
  authTokenMiddleware,
  getAnimeUserStatusController
);

export default animeUserStatus;
