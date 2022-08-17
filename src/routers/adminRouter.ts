import { Router } from "express";
import {
  adminCreateAnimeController,
  getSeasonsController,
} from "../controllers/adminController.js";
import { schemaValidator } from "../middlewares/schemaValidatorMiddleware.js";
import adminPanelSchema from "../schemas/adminPanelSchema.js";

const adminRouter = Router();

adminRouter.post(
  "/admin/createAnime",
  schemaValidator(adminPanelSchema.panelSchema),
  adminCreateAnimeController
);

adminRouter.get("/seasons", getSeasonsController);

export default adminRouter;
