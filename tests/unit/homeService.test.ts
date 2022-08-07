import { jest } from "@jest/globals";

import homeService from "../../src/service/homeService.js";
import homeRepository from "../../src/repositories/homeRepository.js";

jest.mock("../../src/repositories/homeRepository");
jest.resetAllMocks();
jest.clearAllMocks();

describe("forYou unit tests suite", () => {
  it("if there is an anime with the user favorites genres, should call all DB calls but getAllAnime", async () => {
    const USER_ID_MAX = 5000;

    jest
      .spyOn(homeRepository, "getFavoriteGenresByUserId")
      .mockImplementationOnce((): any => {
        return ["id"];
      });

    jest
      .spyOn(homeRepository, "getAnimesByGenreId")
      .mockImplementationOnce((): any => {
        return ["id", "animeName"];
      });

    jest
      .spyOn(homeRepository, "getAllAnime")
      .mockImplementationOnce((): any => {
        return ["id", "animeName"];
      });

    const userId = Math.random() * USER_ID_MAX;
    await homeService.forYouService(userId);
    expect(homeRepository.getFavoriteGenresByUserId).toBeCalled();
    expect(homeRepository.getAnimesByGenreId).toBeCalled();
    expect(homeRepository.getAllAnime).not.toBeCalled();
  });

  it("if there is an anime with the user favorites genres, should call all DB calls", async () => {
    const USER_ID_MAX = 5000;

    jest
      .spyOn(homeRepository, "getFavoriteGenresByUserId")
      .mockImplementationOnce((): any => {
        return ["id"];
      });

    jest
      .spyOn(homeRepository, "getAnimesByGenreId")
      .mockImplementationOnce((): any => {
        return [];
      });

    jest
      .spyOn(homeRepository, "getAllAnime")
      .mockImplementationOnce((): any => {
        return ["id", "animeName"];
      });

    const userId = Math.random() * USER_ID_MAX;
    await homeService.forYouService(userId);
    expect(homeRepository.getFavoriteGenresByUserId).toBeCalled();
    expect(homeRepository.getAnimesByGenreId).toBeCalled();
    expect(homeRepository.getAllAnime).toBeCalled();
  });
});
