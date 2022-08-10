import { Router } from "express";
import {
  forYouController,
  popularController,
  seasonController,
} from "../controllers/homeController.js";
import authTokenMiddleware from "../middlewares/authTokenMiddleware.js";

const homeRouter = Router();

homeRouter.get("/home/foryou", authTokenMiddleware, forYouController);
homeRouter.get("/home/season", authTokenMiddleware, seasonController);
homeRouter.get("/home/popular", authTokenMiddleware, popularController);

export default homeRouter;
