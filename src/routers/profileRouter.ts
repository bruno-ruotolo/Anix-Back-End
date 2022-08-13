import { Router } from "express";
import { getProfileInfosController } from "../controllers/profileController.js";
import authTokenMiddleware from "../middlewares/authTokenMiddleware.js";

const profileRouter = Router();

profileRouter.get(
  "/user/:userId",
  authTokenMiddleware,
  getProfileInfosController
);

export default profileRouter;
