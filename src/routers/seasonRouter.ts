import { Router } from "express";
import { getSeasonAnimesController } from "../controllers/seasonController.js";
import authTokenMiddleware from "../middlewares/authTokenMiddleware.js";

const seasonRouter = Router();

seasonRouter.get("/season", authTokenMiddleware, getSeasonAnimesController);

export default seasonRouter;
