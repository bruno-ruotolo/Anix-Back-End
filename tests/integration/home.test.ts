import app from "../../src/app.js";
import prisma from "../../src/config/db.js";
import supertest from "supertest";

import scenarioFactory from "../factories/scenarioFactory.js";

beforeEach(async () => {
  await scenarioFactory.resetData();
});

const agent = supertest(app);

describe("GET /home/foryou Suite", () => {
  it("given a valid header, should return 200 and an anime", async () => {
    const token = await scenarioFactory.createTokenScenario();

    const result = await agent
      .get("/home/foryou")
      .set("Authorization", `Bearer ${token}`);

    const { statusCode } = result;

    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result).not.toBeFalsy();
    expect(statusCode).toBe(200);
  });

  it("given a invalid header, should return 500 and not return an anime", async () => {
    const token = await scenarioFactory.createTokenScenario();

    const result = await agent
      .get("/home/foryou")
      .set("Authorization", `Bearer sdasdasdasd45144w1545641d658aw`);

    const { statusCode } = result;

    expect(statusCode).toBe(500);
  });
});

describe("GET /home/season Suite", () => {
  it("given a valid header, should return 200 and a list of current season animes", async () => {
    const token = await scenarioFactory.createTokenScenario();
    const actualDate = new Date().toJSON();
    const year = actualDate.slice(0, 4);
    const ACTUAL_SEASON = "Summer";

    const result = await agent
      .get("/home/season")
      .set("Authorization", `Bearer ${token}`);

    const { statusCode } = result;

    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result).not.toBeFalsy();
    expect(result.body[0].year.year).toEqual(parseInt(year));
    expect(result.body[0].season.name).toEqual(ACTUAL_SEASON);
    expect(statusCode).toBe(200);
  });

  it("given a invalid header, should return 500 and not return an anime", async () => {
    const token = await scenarioFactory.createTokenScenario();

    const result = await agent
      .get("/home/season")
      .set("Authorization", `Bearer sdasdasdasd45144w1545641d658aw`);

    const { statusCode } = result;

    expect(statusCode).toBe(500);
  });
});

describe("GET /home/season Suite", () => {
  it("given a valid header, should return 200 and a list of the most popular animes", async () => {
    const token = await scenarioFactory.createTokenScenario();

    const result = await agent
      .get("/home/popular")
      .set("Authorization", `Bearer ${token}`);

    const { statusCode } = result;

    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result).not.toBeFalsy();
    expect(result.body[0]._count.UserFavoriteAnime).toBeGreaterThanOrEqual(
      result.body[1]._count.UserFavoriteAnime
    );
    expect(result.body[1]._count.UserFavoriteAnime).toBeGreaterThanOrEqual(
      result.body[2]._count.UserFavoriteAnime
    );
    expect(statusCode).toBe(200);
  });

  it("given a invalid header, should return 500 and not return an anime", async () => {
    const result = await agent
      .get("/home/popular")
      .set("Authorization", `Bearer sdasdasdasd45144w1545641d658aw`);

    const { statusCode } = result;

    expect(statusCode).toBe(500);
  });
});
