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
describe("GET /anime/:id/rate test suite", () => {
  it("given a valid token, anime id and body rate, return 201 and persist the rate", async () => {
    const ANIME_ID = 1;
    const RATE = faker.datatype.number({ min: 1, max: 5 });
    const userInfos = await scenarioFactory.animeScenario();
    const { token, id } = userInfos;

    const result = await agent
      .post(`/anime/${ANIME_ID}/rate`)
      .send({ rate: RATE })
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
    const RATE = faker.datatype.number({ min: 1, max: 5 });
    const userInfos = await scenarioFactory.animeScenario();
    const { token, id } = userInfos;

    const result = await agent
      .post(`/anime/${ANIME_ID}/rate`)
      .send({ rate: RATE })
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
    const userInfos = await scenarioFactory.animeScenario();
    const { token, id } = userInfos;

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

//FAVORITE
describe("GET /anime/:id/favorite test suite", () => {
  it("given a valid token and anime id, return 201 and persistde favorite", async () => {
    const ANIME_ID = 1;
    const userInfos = await scenarioFactory.animeScenario();
    const { token, id } = userInfos;

    const result = await agent
      .post(`/anime/${ANIME_ID}/favorite`)
      .set("Authorization", `Bearer ${token}`);
    const { statusCode } = result;
    const createdFavorite = await prisma.userFavoriteAnime.findUnique({
      where: { userId_animeId: { userId: id, animeId: ANIME_ID } },
    });

    expect(createdFavorite).not.toBeNull();
    expect(createdFavorite).not.toBeUndefined();
    expect(statusCode).toBe(201);
  });

  it("given a invalid anime, return 404", async () => {
    const ANIME_ID = 10000;
    const userInfos = await scenarioFactory.animeScenario();
    const { token, id } = userInfos;

    const result = await agent
      .post(`/anime/${ANIME_ID}/favorite`)
      .set("Authorization", `Bearer ${token}`);
    const { statusCode } = result;

    const createdFavorite = await prisma.userFavoriteAnime.findUnique({
      where: { userId_animeId: { userId: id, animeId: ANIME_ID } },
    });

    expect(createdFavorite).toBeNull();
    expect(statusCode).toBe(404);
  });

  it("given a invalid token, return 500", async () => {
    const ANIME_ID = 1;
    const userInfos = await scenarioFactory.animeScenario();
    const { token, id } = userInfos;

    const result = await agent
      .post(`/anime/${ANIME_ID}/favorite`)
      .set("Authorization", `Bearer asdasdasd4554w89d48d4a564sd`);
    const { statusCode } = result;

    const createdFavorite = await prisma.userFavoriteAnime.findUnique({
      where: { userId_animeId: { userId: id, animeId: ANIME_ID } },
    });

    expect(createdFavorite).toBeNull();
    expect(statusCode).toBe(500);
  });
});

describe("DELETE /anime/:id/favorite test suite", () => {
  it("given a valid token and anime id, return 200 and delete the persisted favorite", async () => {
    const ANIME_ID = 1;
    const userInfos = await scenarioFactory.animeScenario();
    const { token, id } = userInfos;
    await scenarioFactory.deleteFavoriteScenario(id, ANIME_ID);

    const result = await agent
      .delete(`/anime/${ANIME_ID}/favorite`)
      .set("Authorization", `Bearer ${token}`);
    const { statusCode } = result;

    const createdFavorite = await prisma.userFavoriteAnime.findUnique({
      where: { userId_animeId: { userId: id, animeId: ANIME_ID } },
    });

    expect(createdFavorite).toBeNull();
    expect(statusCode).toBe(200);
  });

  it("given a invalid anime, return 404", async () => {
    const ANIME_ID = 10000;
    const userInfos = await scenarioFactory.animeScenario();
    const { token, id } = userInfos;

    const result = await agent
      .delete(`/anime/${ANIME_ID}/favorite`)
      .set("Authorization", `Bearer ${token}`);
    const { statusCode } = result;

    expect(statusCode).toBe(404);
  });

  it("given a invalid token, return 500", async () => {
    const ANIME_ID = 1;
    const userInfos = await scenarioFactory.animeScenario();
    const { token, id } = userInfos;

    const result = await agent
      .delete(`/anime/${ANIME_ID}/favorite`)
      .set("Authorization", `Bearer asdasdasd4554w89d48d4a564sd`);
    const { statusCode } = result;

    expect(statusCode).toBe(500);
  });
});

//STATUS
describe("GET /anime/:id/status test suite", () => {
  it("given a valid token, anime id and status body, return 201 and persist status", async () => {
    const ANIME_ID = 1;
    const STATUS = faker.datatype.number({ min: 1, max: 3 });
    const userInfos = await scenarioFactory.animeScenario();
    const { token, id } = userInfos;

    const result = await agent
      .post(`/anime/${ANIME_ID}/status`)
      .send({ statusId: STATUS })
      .set("Authorization", `Bearer ${token}`);
    const { statusCode } = result;
    const createdStatus = await prisma.userStatusAnime.findUnique({
      where: { userId_animeId: { userId: id, animeId: ANIME_ID } },
    });

    expect(createdStatus).not.toBeNull();
    expect(createdStatus).not.toBeUndefined();
    expect(statusCode).toBe(201);
  });

  it("given a invalid anime, return 404", async () => {
    const ANIME_ID = 10000;
    const STATUS = faker.datatype.number({ min: 1, max: 3 });
    const userInfos = await scenarioFactory.animeScenario();
    const { token, id } = userInfos;

    const result = await agent
      .post(`/anime/${ANIME_ID}/status`)
      .send({ statusId: STATUS })
      .set("Authorization", `Bearer ${token}`);
    const { statusCode } = result;
    const createdStatus = await prisma.userStatusAnime.findUnique({
      where: { userId_animeId: { userId: id, animeId: ANIME_ID } },
    });
    expect(createdStatus).toBeNull();
    expect(statusCode).toBe(404);
  });

  it("given a invalid token, return 500", async () => {
    const ANIME_ID = 1;
    const STATUS = faker.datatype.number({ min: 1, max: 3 });
    const userInfos = await scenarioFactory.animeScenario();
    const { token, id } = userInfos;

    const result = await agent
      .post(`/anime/${ANIME_ID}/status`)
      .send({ statusId: STATUS })
      .set("Authorization", `Bearer adsd4wd68q4wd6`);
    const { statusCode } = result;

    const createdStatus = await prisma.userStatusAnime.findUnique({
      where: { userId_animeId: { userId: id, animeId: ANIME_ID } },
    });

    expect(createdStatus).toBeNull();
    expect(statusCode).toBe(500);
  });
});

describe("DELETE /anime/:id/status test suite", () => {
  it("given a valid token and anime id, return 200 and delete the persisted status", async () => {
    const ANIME_ID = 1;
    const STATUS = faker.datatype.number({ min: 1, max: 3 });
    const userInfos = await scenarioFactory.animeScenario();
    const { token, id } = userInfos;
    await scenarioFactory.deleteStatusScenario(id, ANIME_ID, STATUS);

    const result = await agent
      .delete(`/anime/${ANIME_ID}/status`)
      .set("Authorization", `Bearer ${token}`);
    const { statusCode } = result;

    const createdStatus = await prisma.userStatusAnime.findUnique({
      where: { userId_animeId: { userId: id, animeId: ANIME_ID } },
    });

    expect(createdStatus).toBeNull();
    expect(statusCode).toBe(200);
  });

  it("given a invalid anime, return 404", async () => {
    const ANIME_ID = 100000;
    const userInfos = await scenarioFactory.animeScenario();
    const { token, id } = userInfos;

    const result = await agent
      .delete(`/anime/${ANIME_ID}/status`)
      .set("Authorization", `Bearer ${token}`);
    const { statusCode } = result;

    expect(statusCode).toBe(404);
  });

  it("given a invalid token, return 500", async () => {
    const ANIME_ID = 1;
    const userInfos = await scenarioFactory.animeScenario();

    const result = await agent
      .delete(`/anime/${ANIME_ID}/status`)
      .set("Authorization", `Bearer sdad4w84d89q4wd894`);
    const { statusCode } = result;

    expect(statusCode).toBe(500);
  });
});

//GET ALL STATUS
describe("GET /anime/:id/status Suite", () => {
  it("given a valid header, should return 200 and the status list", async () => {
    const token = await scenarioFactory.createTokenScenario();

    const result = await agent
      .get("/anime/:id/status")
      .set("Authorization", `Bearer ${token}`);

    const { statusCode } = result;

    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result).not.toBeFalsy();
    expect(result.body).not.toBeFalsy();
    expect(statusCode).toBe(200);
  });

  it("given a invalid header, should return 500", async () => {
    const result = await agent
      .get("/anime/:id/status")
      .set("Authorization", `Bearer sdasdasdasd45144w1545641d658aw`);

    const { statusCode } = result;

    expect(statusCode).toBe(500);
  });
});
