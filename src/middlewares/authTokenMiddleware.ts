import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { unauthorizedError } from "../utils/errorUtil.js";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

  if (!token) throw unauthorizedError("Invalid User or Not Logged In");

  const data = jwt.verify(token, JWT_SECRET_KEY);

  if (!data) throw unauthorizedError("Invalid User or Not Logged In");

  res.locals.token = data;
  next();
}
