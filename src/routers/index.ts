import { Router } from "express";
import adminRouter from "./adminRouter.js";
import animeRouter from "./animeRouter.js";

import animeUserStatus from "./animeUserStatus.js";
import authRouter from "./authRouter.js";
import e2eTestRouter from "./e2eTestRouter.js";
import homeRouter from "./homeRouter.js";
import profileRouter from "./profileRouter.js";
import searchRouter from "./searchRouter.js";

const mainRouter = Router();

mainRouter.use(authRouter);
mainRouter.use(homeRouter);
mainRouter.use(animeRouter);
mainRouter.use(animeUserStatus);
mainRouter.use(profileRouter);
mainRouter.use(searchRouter);
mainRouter.use(adminRouter);

if (process.env.NODE_ENV === "test") {
  mainRouter.use(e2eTestRouter);
}

export default mainRouter;
