import { Router } from "express";

import authRouter from "./authRouter.js";
import e2eTestRouter from "./e2eTestRouter.js";
import homeRouter from "./homeRouter.js";

const mainRouter = Router();

mainRouter.use(authRouter);
mainRouter.use(homeRouter);
if (process.env.NODE_ENV === "test") {
  mainRouter.use(e2eTestRouter);
}

export default mainRouter;
