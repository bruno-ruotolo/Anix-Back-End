import bcrypt from "bcrypt";

async function encryptPassword(password: string) {
  const SALT = 10;
  const passwordHash = bcrypt.hashSync(password, SALT);
  return passwordHash;
}

const utils = {
  encryptPassword,
};

export default utils;
