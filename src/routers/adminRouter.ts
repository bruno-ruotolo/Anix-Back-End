import { Router } from "express";
import { schemaValidator } from "../middlewares/schemaValidatorMiddleware.js";
import adminPanelSchema from "../schemas/adminPanelSchema.js";

const adminRouter = Router();

adminRouter.post(
  "/admin/createAnime",
  schemaValidator(adminPanelSchema.panelSchema)
);

export default adminRouter;
