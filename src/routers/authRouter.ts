import { Router } from "express";

import { singUpController } from "../controllers/authController.js";
import { schemaValidator } from "../middlewares/schemaValidatorMiddleware.js";
import authSchema from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  schemaValidator(authSchema.signUpSchema),
  singUpController
);

export default authRouter;
