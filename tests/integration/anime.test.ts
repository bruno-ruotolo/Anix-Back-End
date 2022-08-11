import { faker } from "@faker-js/faker";
import app from "../../src/app.js";
import supertest from "supertest";

import scenarioFactory from "../factories/scenarioFactory.js";
import prisma from "../../src/config/db.js";

beforeEach(async () => {
  await scenarioFactory.resetData();
});
const agent = supertest(app);

//INFOS
describe("GET /anime/:id test suite", () => {
  it("given a valid token and anime, return 200 and the anime infos", async () => {
    const ANIME_ID = 1;
    const token = await scenarioFactory.createTokenScenario();

    const result = await agent
      .get(`/anime/${ANIME_ID}`)
      .set("Authorization", `Bearer ${token}`);
    const { statusCode } = result;

    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result).not.toBeFalsy();
    expect(result.body.id).toBeTruthy();
    expect(result.body.avgRate).toBeDefined();
    expect(statusCode).toBe(200);
  });

  it("given a invalid anime, return 404", async () => {
    const ANIME_ID = 10000;
    const token = await scenarioFactory.createTokenScenario();

    const result = await agent
      .get(`/anime/${ANIME_ID}`)
      .set("Authorization", `Bearer ${token}`);
    const { statusCode } = result;

    expect(statusCode).toBe(404);
  });

  it("given a invalid token, return 500", async () => {
    const ANIME_ID = 1;
    const token = "asdasd4asdw54d8w4d89a4sd2q32";

    const result = await agent
      .get(`/anime/${ANIME_ID}`)
      .set("Authorization", `Bearer ${token}`);
    const { statusCode } = result;

    expect(statusCode).toBe(500);
  });
});

//RATE
//FIXME: FIX TESTS
describe("GET /anime/:id/rate test suite", () => {
  it("given a valid token and body rate, return 201", async () => {
    const ANIME_ID = 1;
    const RATE = faker.datatype.number({ min: 1, max: 5 });
    const { token, user } = await scenarioFactory.animeScenario();
    const { id } = user;

    const result = await agent
      .post(`/anime/${ANIME_ID}/rate`)
      .send({ RATE })
      .set("Authorization", `Bearer ${token}`);
    const { statusCode } = result;

    const createdRate = await prisma.userRateAnime.findUnique({
      where: { userId_animeId: { userId: id, animeId: ANIME_ID } },
    });

    expect(createdRate).not.toBeNull();
    expect(createdRate).not.toBeUndefined();
    expect(statusCode).toBe(201);
  });

  it("given a invalid anime, return 404", async () => {
    const ANIME_ID = 10000;
    const { token, user } = await scenarioFactory.animeScenario();
    const { id } = user;

    const result = await agent
      .post(`/anime/${ANIME_ID}/rate`)
      .set("Authorization", `Bearer ${token}`);
    const { statusCode } = result;

    const createdRate = await prisma.userRateAnime.findUnique({
      where: { userId_animeId: { userId: id, animeId: ANIME_ID } },
    });

    expect(createdRate).toBeNull();
    expect(statusCode).toBe(404);
  });

  it("given a invalid token, return 500", async () => {
    const ANIME_ID = 1;
    const { token, user } = await scenarioFactory.animeScenario();
    const { id } = user;

    const result = await agent
      .post(`/anime/${ANIME_ID}/rate`)
      .set("Authorization", `Bearer asdasdasd4554w89d48d4a564sd`);
    const { statusCode } = result;

    const createdRate = await prisma.userRateAnime.findUnique({
      where: { userId_animeId: { userId: id, animeId: ANIME_ID } },
    });

    expect(createdRate).toBeNull();
    expect(statusCode).toBe(500);
  });
});
