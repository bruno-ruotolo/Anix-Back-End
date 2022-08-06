import { Router } from "express";

import {
  getAllGendersController,
  getAllGenresController,
  singUpController,
  validateEmailController,
} from "../controllers/authController.js";
import { schemaValidator } from "../middlewares/schemaValidatorMiddleware.js";
import authSchema from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  schemaValidator(authSchema.signUpSchema),
  singUpController
);

authRouter.get("/genres", getAllGenresController);
authRouter.get("/genders", getAllGendersController);
authRouter.post("/emailValidate", validateEmailController);

export default authRouter;
