import prisma from "../../src/config/db.js";

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

const scenarioFactory = {
  resetData,
};

export default scenarioFactory;
