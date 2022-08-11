import prisma from "../../src/config/db.js";
import utils from "../../src/utils/utils.js";
import authFactory from "./authFactory.js";

async function resetData() {
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE user_favorite_genres RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE user_rate_animes RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE user_favorites_animes RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE user_status_animes RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE sessions RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`,
  ]);
}

async function signInScenario() {
  const userFavoriteGenres = authFactory.createUserFavoriteGenresBody();
  const userInformations = authFactory.createUserInformationBody();
  const passwordHash = await utils.encryptPassword(userInformations.password);
  const user = await prisma.user.create({
    data: { ...userInformations, password: passwordHash },
  });
  await prisma.userFavoriteGenre.create({
    data: { ...userFavoriteGenres, userId: user.id },
  });

  return userInformations;
}

async function createTokenScenario() {
  const userFavoriteGenres = authFactory.createUserFavoriteGenresBody();
  const userInformations = authFactory.createUserInformationBody();
  const passwordHash = await utils.encryptPassword(userInformations.password);
  const user = await prisma.user.create({
    data: { ...userInformations, password: passwordHash },
  });
  await prisma.userFavoriteGenre.create({
    data: { ...userFavoriteGenres, userId: user.id },
  });

  const token = utils.generateJWTToken(user);

  return token;
}

async function animeScenario() {
  const userFavoriteGenres = authFactory.createUserFavoriteGenresBody();
  const userInformations = authFactory.createUserInformationBody();
  const passwordHash = await utils.encryptPassword(userInformations.password);
  const user = await prisma.user.create({
    data: { ...userInformations, password: passwordHash },
  });
  await prisma.userFavoriteGenre.create({
    data: { ...userFavoriteGenres, userId: user.id },
  });

  const token = await utils.generateJWTToken(user);

  return { token, id: user.id };
}

async function deleteFavoriteScenario(userId: number, animeId: number) {
  const user = await prisma.userFavoriteAnime.create({
    data: { userId, animeId },
  });
}

async function deleteStatusScenario(
  userId: number,
  animeId: number,
  statusId: number
) {
  const user = await prisma.userStatusAnime.create({
    data: { userId, animeId, statusId },
  });
}

const scenarioFactory = {
  resetData,
  signInScenario,
  createTokenScenario,
  animeScenario,
  deleteFavoriteScenario,
  deleteStatusScenario,
};

export default scenarioFactory;
