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

describe("GET /genres suite", () => {
  it("should return 200 and all the genres", async () => {
    const GENRE_QUANTITY = 30;

    const result = await agent.get("/genres");
    const { statusCode } = result;

    expect(result.body).toHaveLength(GENRE_QUANTITY);
    expect(statusCode).toBe(200);
  });
});

describe("GET /genders suite", () => {
  it("should return 200 and all the genders", async () => {
    const GENDER_QUANTITY = 5;

    const result = await agent.get("/genders");
    const { statusCode } = result;

    expect(result.body).toHaveLength(GENDER_QUANTITY);
    expect(statusCode).toBe(200);
  });
});

describe("GET /emailValidate suite", () => {
  it("given a valid email, should not call a error", async () => {
    const userInformations = authFactory.createUserInformationBody();

    const result = await agent
      .post("/emailValidate")
      .send({ email: userInformations.email });
    const { statusCode } = result;

    expect(statusCode).toBe(200);
  });
});

describe("POST / suite", () => {
  it("given a valid email/password, should return 200 and persist token", async () => {
    const userInformations = await scenarioFactory.signInScenario();
    const { email, password } = userInformations;

    const result = await agent.post("/").send({ email, password });
    const { statusCode } = result;
    const { text: token } = result;

    const tokenCreated = await prisma.session.findUnique({ where: { token } });

    expect(token).not.toBeUndefined();
    expect(token).not.toBeNull();
    expect(tokenCreated).not.toBeUndefined();
    expect(tokenCreated).not.toBeNull();
    expect(statusCode).toBe(200);
  });

  it("given a invalid email/password, should return 401 and not persist token", async () => {
    const userInformations = await scenarioFactory.signInScenario();
    const { email, password } = userInformations;

    const result = await agent
      .post("/")
      .send({ email, password: "123456Test%" });
    const { statusCode } = result;
    const { text: token } = result;

    const tokenCreated = await prisma.session.findUnique({ where: { token } });

    expect(tokenCreated).toBeNull();
    expect(statusCode).toBe(401);
  });
});
