import { Router } from "express";
import { animeInfosController } from "../controllers/animeController.js";
import authTokenMiddleware from "../middlewares/authTokenMiddleware.js";
import { schemaValidator } from "../middlewares/schemaValidatorMiddleware.js";

const animeRouter = Router();

animeRouter.get("/anime/:id", authTokenMiddleware, animeInfosController);

export default animeRouter;
