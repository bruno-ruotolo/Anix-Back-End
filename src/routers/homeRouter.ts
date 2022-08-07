import { Router } from "express";
import { forYouController } from "../controllers/homeController.js";
import authTokenMiddleware from "../middlewares/authTokenMiddleware.js";

const homeRouter = Router();

homeRouter.get("/home/foryou", authTokenMiddleware, forYouController);

export default homeRouter;
