import { Request, Response } from "express";

import { e2eTestService } from "./../service/e2eTestService.js";

export async function deleteAllDataController(req: Request, res: Response) {
  await e2eTestService.deleteAllDataService();
  res.sendStatus(200);
}
