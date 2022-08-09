import prisma from "../config/db.js";

async function deleteAllData() {
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE user_favorite_genres RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE user_rate_animes RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE user_favorites_animes RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE user_status_animes RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE sessions RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`,
  ]);
}

const e2eTestRepository = { deleteAllData };

export default e2eTestRepository;
