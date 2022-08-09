import { Router } from "express";
import {
  forYouController,
  seasonController,
} from "../controllers/homeController.js";
import authTokenMiddleware from "../middlewares/authTokenMiddleware.js";

const homeRouter = Router();

homeRouter.get("/home/foryou", authTokenMiddleware, forYouController);
homeRouter.get("/home/season", authTokenMiddleware, seasonController);

export default homeRouter;
