import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

async function encryptPassword(password: string) {
  const SALT = 10;
  const passwordHash = bcrypt.hashSync(password, SALT);
  return passwordHash;
}

async function generateJWTToken(userResult: User) {
  const { id, email, username, image } = userResult;
  const tokenBody = { id, email, username, image };
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  const EXPIRATION_DATE = { expiresIn: "2d" };

  const token = jwt.sign(tokenBody, JWT_SECRET_KEY, EXPIRATION_DATE);

  return token;
}

const utils = {
  encryptPassword,
  generateJWTToken,
};

export default utils;
