import { Router } from "express";
import { deleteAllDataController } from "../controllers/e2eTestController.js";

const e2eTestRouter = Router();

e2eTestRouter.post("/reset-data", deleteAllDataController);

export default e2eTestRouter;
