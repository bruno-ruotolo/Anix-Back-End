import { Router } from "express";
import {
  getAllYearsController,
  getAnimesSearchController,
} from "../controllers/searchController.js";
import authTokenMiddleware from "../middlewares/authTokenMiddleware.js";

const searchRouter = Router();

searchRouter.get("/search", authTokenMiddleware, getAnimesSearchController);
searchRouter.get("/years", authTokenMiddleware, getAllYearsController);

export default searchRouter;
