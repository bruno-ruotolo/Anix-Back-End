import { Router } from "express";
import animeRouter from "./animeRouter.js";

import authRouter from "./authRouter.js";
import e2eTestRouter from "./e2eTestRouter.js";
import homeRouter from "./homeRouter.js";

const mainRouter = Router();

mainRouter.use(authRouter);
mainRouter.use(homeRouter);
mainRouter.use(animeRouter);
if (process.env.NODE_ENV === "test") {
  mainRouter.use(e2eTestRouter);
}

export default mainRouter;
