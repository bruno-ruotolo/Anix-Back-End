import app from "../../src/app.js";
import supertest from "supertest";

import scenarioFactory from "../factories/scenarioFactory.js";

beforeEach(async () => {
  await scenarioFactory.resetData();
});

const agent = supertest(app);

describe("GET /search Suite", () => {
  it("given a valid user, should return 200 and the anime list", async () => {
    const token = await scenarioFactory.createTokenScenario();

    const result = await agent
      .get("/search")
      .set("Authorization", `Bearer ${token}`);

    const { statusCode } = result;

    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result).not.toBeFalsy();
    expect(result.body).not.toBeFalsy();
    expect(statusCode).toBe(200);
  });

  it("given a invalid header, should return 500 ", async () => {
    const result = await agent
      .get("/search")
      .set("Authorization", `Bearer sdasdasdasd45144w1545641d658aw`);

    const { statusCode } = result;

    expect(statusCode).toBe(500);
  });
});

describe("GET /years Suite", () => {
  it("given a valid user, should return 200 and the years list", async () => {
    const token = await scenarioFactory.createTokenScenario();

    const result = await agent
      .get("/years")
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
      .get("/years")
      .set("Authorization", `Bearer sdasdasdasd45144w1545641d658aw`);

    const { statusCode } = result;

    expect(statusCode).toBe(500);
  });
});
