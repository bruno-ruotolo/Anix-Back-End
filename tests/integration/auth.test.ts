import app from "../../src/app.js";
import prisma from "../../src/config/db.js";
import supertest from "supertest";

import scenarioFactory from "../factories/scenarioFactory.js";
import authFactory from "../factories/authFactory.js";

beforeEach(async () => {
  await scenarioFactory.resetData();
});

const agent = supertest(app);

describe("POST /signUp Suite", () => {
  it("given a valid data body, should return 201 and persist in database", async () => {
    const userInformations = authFactory.createUserInformationBody();
    const userFavoriteGenres = authFactory.createUserFavoriteGenresBody();

    const result = await agent.post("/signup").send({
      ...userInformations,
      confirmPassword: userInformations.password,
      ...userFavoriteGenres,
    });
    const { statusCode } = result;

    const createdUser = await prisma.user.findFirst({
      where: {
        email: userInformations.email,
      },
    });

    expect(createdUser).not.toBeNull();
    expect(createdUser).not.toBeUndefined();
    expect(statusCode).toBe(201);
  });
});
