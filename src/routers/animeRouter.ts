import { Router } from "express";
import {
  animeInfosController,
  animeCreateRateController,
  animeCreateFavoriteController,
  animeDeleteFavoriteController,
  animeCreateStatusController,
  animeDeleteStatusController,
} from "../controllers/animeController.js";
import authTokenMiddleware from "../middlewares/authTokenMiddleware.js";
import { schemaValidator } from "../middlewares/schemaValidatorMiddleware.js";
import animeSchema from "../schemas/animeSchema.js";

const animeRouter = Router();

animeRouter.get("/anime/:id", authTokenMiddleware, animeInfosController);

animeRouter.post(
  "/anime/:id/rate",
  authTokenMiddleware,
  schemaValidator(animeSchema.rateSchema),
  animeCreateRateController
);

animeRouter.post(
  "/anime/:id/favorite",
  authTokenMiddleware,
  animeCreateFavoriteController
);

animeRouter.delete(
  "/anime/:id/favorite",
  authTokenMiddleware,
  animeDeleteFavoriteController
);

animeRouter.post(
  "/anime/:id/status",
  authTokenMiddleware,
  schemaValidator(animeSchema.statusSchema),
  animeCreateStatusController
);

animeRouter.delete(
  "/anime/:id/status",
  authTokenMiddleware,
  animeDeleteStatusController
);

export default animeRouter;
