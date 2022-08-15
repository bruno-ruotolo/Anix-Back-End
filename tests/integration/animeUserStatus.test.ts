import app from "../../src/app.js";
import prisma from "../../src/config/db.js";
import supertest from "supertest";

import scenarioFactory from "../factories/scenarioFactory.js";

beforeEach(async () => {
  await scenarioFactory.resetData();
});

const agent = supertest(app);

describe("GET /user/animes Suite", () => {
  it("given a valid header , should return 200 and an anime list ", async () => {
    const token = await scenarioFactory.createTokenScenario();

    const result = await agent
      .get("/user/animes")
      .set("Authorization", `Bearer ${token}`);

    const { statusCode } = result;

    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result).not.toBeFalsy();
    expect(statusCode).toBe(200);
  });

  it("given a invalid header, should return 500 and not return an anime", async () => {
    const result = await agent
      .get("/user/animes")
      .set("Authorization", `Bearer sdasdasdasd45144w1545641d658aw`);

    const { statusCode } = result;

    expect(statusCode).toBe(500);
  });
});
