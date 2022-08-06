import jwt from "jsonwebtoken";
import { jest } from "@jest/globals";
import bcrypt from "bcrypt";

import authService from "../../src/service/authService.js";
import authRepository from "../../src/repositories/authRepository.js";
import authFactory from "../factories/authFactory.js";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../../src/utils/errorUtil.js";

jest.mock("../../src/repositories/authRepository");

describe("signup unit test suite", () => {
  it("given a valid user, should call createUser", async () => {
    const userInformations = authFactory.createUserInformationBody();
    const userFavoriteGenres = authFactory.createUserFavoriteGenresBody();

    jest
      .spyOn(authRepository, "getGenderById")
      .mockImplementationOnce((): any => {
        return { id: 1, name: "Male" };
      });

    jest.spyOn(authRepository, "getGenreById").mockImplementation((): any => {
      return { id: 1, name: "Adventure" };
    });

    jest.spyOn(bcrypt, "hashSync").mockImplementationOnce((): any => {
      return "$2b$10$2RnJkM8FcYlfiMX3fNJqGeK.mwfFOwEL7soB2RIVl5Uhp0d.ZWo7.";
    });

    jest
      .spyOn(authRepository, "createUser")
      .mockImplementationOnce((): any => {});

    await authService.signUpService(userInformations, userFavoriteGenres);

    expect(authRepository.getGenderById).toBeCalled();
    expect(authRepository.getGenreById).toBeCalled();
    expect(bcrypt.hashSync).toBeCalled();
    expect(authRepository.createUser).toBeCalled();
  });

  it("given a invalid gender, should call notFoundError", async () => {
    const userInformations = authFactory.createUserInformationBody();
    const userFavoriteGenres = authFactory.createUserFavoriteGenresBody();

    jest
      .spyOn(authRepository, "getGenderById")
      .mockImplementation((): any => {});

    const promise = authService.signUpService(
      userInformations,
      userFavoriteGenres
    );

    expect(authRepository.getGenderById).toBeCalled();
    expect(promise).rejects.toEqual(notFoundError("Gender Not Found"));
  });

  it("given a invalid anime genrer, should call notFoundError", async () => {
    const userInformations = authFactory.createUserInformationBody();
    const userFavoriteGenres = authFactory.createUserFavoriteGenresBody();

    jest.spyOn(authRepository, "getGenderById").mockImplementation((): any => {
      return { id: 1, name: "Male" };
    });

    jest
      .spyOn(authRepository, "getGenreById")
      .mockImplementation((): any => {});

    const promise = authService.signUpService(
      userInformations,
      userFavoriteGenres
    );

    expect(authRepository.getGenderById).toBeCalled();
    expect(authRepository.getGenreById).toBeCalled();
    expect(promise).rejects.toEqual(notFoundError("Genre Not Found"));
  });
});

describe("genres unit test suite", () => {
  it("should call getAllGenres", async () => {
    jest
      .spyOn(authRepository, "getAllGenres")
      .mockImplementationOnce((): any => {});

    await authService.getAllGenresService();

    expect(authRepository.getAllGenres).toBeCalled();
  });
});

describe("genders unit test suite", () => {
  it("should call getAllGenders", async () => {
    jest
      .spyOn(authRepository, "getAllGenders")
      .mockImplementationOnce((): any => {});

    await authService.getAllGendersService();

    expect(authRepository.getAllGenders).toBeCalled();
  });
});

describe("validate email unit test suite", () => {
  it("given a valid email, should not call a error", async () => {
    const userInformations = authFactory.createUserInformationBody();

    jest
      .spyOn(authRepository, "getUserByEmail")
      .mockImplementation((): any => {});

    const promise = authService.validateEmail(userInformations.email);

    expect(authRepository.getUserByEmail).toBeCalled();
    expect(promise).resolves;
  });

  it("given a invalid email, should call conflictError", async () => {
    const userInformations = authFactory.createUserInformationBody();

    jest.spyOn(authRepository, "getUserByEmail").mockImplementation((): any => {
      return { id: 1, email: "email@email" };
    });

    const promise = authService.validateEmail(userInformations.email);

    expect(authRepository.getUserByEmail).toBeCalled();
    expect(promise).rejects.toEqual(
      conflictError("This email is already in use")
    );
  });
});

describe("signin unit test suite", () => {
  it("given a valid user, should call createSession and send a token", async () => {
    const { email, password } = authFactory.createUserInformationBody();
    const signInData = { email, password };

    jest.spyOn(authRepository, "getUserByEmail").mockImplementation((): any => {
      return { id: 1, email: "email@email" };
    });

    jest.spyOn(bcrypt, "compareSync").mockImplementation((): any => {
      return true;
    });

    jest.spyOn(jwt, "sign").mockImplementation((): any => {
      return "as5d4as5d48w47/74sd!";
    });
    jest
      .spyOn(authRepository, "createSession")
      .mockImplementationOnce((): any => {});

    const token = await authService.signInService(signInData);

    expect(authRepository.getUserByEmail).toBeCalled();
    expect(jwt.sign).toBeCalled();
    expect(bcrypt.compareSync).toBeCalled();
    expect(authRepository.createSession).toBeCalled();
    expect(token).not.toBeNull;
    expect(token).not.toBeUndefined;
  });

  it("given a invalid email, should call unauthorizedError", async () => {
    const { email, password } = authFactory.createUserInformationBody();
    const signInData = { email, password };

    jest
      .spyOn(authRepository, "getUserByEmail")
      .mockImplementation((): any => {});

    const promise = authService.signInService(signInData);

    expect(authRepository.getUserByEmail).toBeCalled();
    expect(promise).rejects.toEqual(
      unauthorizedError("Username/Password is not valid")
    );
  });

  it("given a invalid password/email combination, should call unauthorizedError", async () => {
    const { email, password } = authFactory.createUserInformationBody();
    const signInData = { email, password };

    jest.spyOn(authRepository, "getUserByEmail").mockImplementation((): any => {
      return { id: 1, email: "email@email" };
    });

    jest.spyOn(bcrypt, "compareSync").mockImplementation((): any => {
      return false;
    });

    const promise = authService.signInService(signInData);

    expect(authRepository.getUserByEmail).toBeCalled();
    expect(bcrypt.compareSync).toBeCalled();
    expect(promise).rejects.toEqual(
      unauthorizedError("Username/Password is not valid")
    );
  });
});
