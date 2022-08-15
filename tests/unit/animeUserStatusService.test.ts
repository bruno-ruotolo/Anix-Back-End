import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";

import animeUserStatusService from "../../src/service/animeUserStatusService.js";
import animeUserStatusRepository from "../../src/repositories/animeUserStatusRepository.js";

jest.mock("../../src/repositories/animeUserStatusRepository");
jest.resetAllMocks();
jest.clearAllMocks();

describe("anime user status unit tests suite", () => {
  it("if query is done, should call getAnimeByStatusIdAndUserId", async () => {
    const USER_ID = faker.datatype.number();
    const STATUS_ID = 1;
    jest
      .spyOn(animeUserStatusRepository, "getStatusByName")
      .mockImplementationOnce((): any => {
        return true;
      });

    jest
      .spyOn(animeUserStatusRepository, "getAnimeByStatusIdAndUserId")
      .mockImplementationOnce((): any => {});

    await animeUserStatusService.getAnimesByStatus(USER_ID, "Done");

    expect(animeUserStatusRepository.getStatusByName).toBeCalled();
    expect(animeUserStatusRepository.getAnimeByStatusIdAndUserId).toBeCalled();
  });

  it("if query is maybe, should call getAnimeByStatusIdAndUserId", async () => {
    const USER_ID = faker.datatype.number();
    jest
      .spyOn(animeUserStatusRepository, "getStatusByName")
      .mockImplementationOnce((): any => {
        return true;
      });

    jest
      .spyOn(animeUserStatusRepository, "getAnimeByStatusIdAndUserId")
      .mockImplementationOnce((): any => {});

    await animeUserStatusService.getAnimesByStatus(USER_ID, "Maybe");

    expect(animeUserStatusRepository.getStatusByName).toBeCalled();
    expect(animeUserStatusRepository.getAnimeByStatusIdAndUserId).toBeCalled();
  });

  it("if query is watching, should call getAnimeByStatusIdAndUserId", async () => {
    const USER_ID = faker.datatype.number();
    jest
      .spyOn(animeUserStatusRepository, "getStatusByName")
      .mockImplementationOnce((): any => {
        return true;
      });

    jest
      .spyOn(animeUserStatusRepository, "getAnimeByStatusIdAndUserId")
      .mockImplementationOnce((): any => {});

    await animeUserStatusService.getAnimesByStatus(USER_ID, "Watching");

    expect(animeUserStatusRepository.getStatusByName).toBeCalled();
    expect(animeUserStatusRepository.getAnimeByStatusIdAndUserId).toBeCalled();
  });

  it("if query is anything else, should call getAnimeByStatusIdAndUserId with watching", async () => {
    const USER_ID = faker.datatype.number();
    jest
      .spyOn(animeUserStatusRepository, "getStatusByName")
      .mockImplementationOnce((): any => {
        return true;
      });

    jest
      .spyOn(animeUserStatusRepository, "getAnimeByStatusIdAndUserId")
      .mockImplementationOnce((): any => {});

    await animeUserStatusService.getAnimesByStatus(USER_ID, "test");

    expect(animeUserStatusRepository.getStatusByName).toBeCalled();
    expect(animeUserStatusRepository.getAnimeByStatusIdAndUserId).toBeCalled();
  });
});
