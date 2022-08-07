import { Router } from "express";

import authRouter from "./authRouter.js";
import homeRouter from "./homeRouter.js";

const mainRouter = Router();

mainRouter.use(authRouter);
mainRouter.use(homeRouter);

export default mainRouter;
