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
  const EXPIRATION_DATE = { expiresIn: "30d" };

  const token = jwt.sign(tokenBody, JWT_SECRET_KEY, EXPIRATION_DATE);
  return token;
}

function getCurrentSeason() {
  const actualDate = new Date().toJSON();
  const year = actualDate.slice(0, 4);
  const month = parseInt(actualDate.slice(5, 7));

  if (month >= 1 && month <= 3) {
    return ["Winter", year];
  }

  if (month >= 4 && month <= 6) {
    return ["Spring", year];
  }

  if (month >= 7 && month <= 9) {
    return ["Summer", year];
  }

  if (month >= 10 && month <= 12) {
    return ["Fall", year];
  }
}

const utils = {
  encryptPassword,
  generateJWTToken,
  getCurrentSeason,
};

export default utils;
