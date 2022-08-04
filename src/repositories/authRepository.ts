import prisma from "../config/db.js";
import {
  UserCreateData,
  UserFavoriteGenresCreateData,
} from "../interfaces/createDataInterface.js";

async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

async function getGenderById(id: number) {
  return await prisma.gender.findUnique({ where: { id } });
}

async function getUserById(id: number) {
  return await prisma.user.findUnique({ where: { id } });
}

async function getGenreById(id: number) {
  return await prisma.genre.findUnique({ where: { id } });
}

async function createUser(
  userInformations: UserCreateData,
  userFavoriteGenres: UserFavoriteGenresCreateData
) {
  const userResult = await prisma.user.create({ data: userInformations });
  await prisma.userFavoriteGenre.create({
    data: { ...userFavoriteGenres, userId: userResult.id },
  });
}

const authRepository = {
  getUserByEmail,
  getGenderById,
  getUserById,
  getGenreById,
  createUser,
};

export default authRepository;
