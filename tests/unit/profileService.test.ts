import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";

import profileService from "../../src/service/profileService.js";
import profileRepository from "../../src/repositories/profileRepository.js";
import { notFoundError } from "../../src/utils/errorUtil.js";

jest.mock("../../src/repositories/profileRepository");
jest.resetAllMocks();
jest.clearAllMocks();

describe("profile unit tests suite", () => {
  it("given a existing user, should call getProfileByUserId", async () => {
    const USER_ID = faker.datatype.number();

    jest
      .spyOn(profileRepository, "getProfileByUserId")
      .mockImplementationOnce((): any => {
        return {
          id: 3,
          email: "user@user.com",
          password:
            "$2b$10$mDhAm/vezEO0.moNzhCxseaRn7DKv9WLM3wyYK0xWahUd31iRnnay",
          username: "Bode 45614f724c54",
          image:
            "https://photoarts.com.br/wp-content/uploads/2020/02/Moon-Por-NASA.jpg",
          genderId: 1,
          UserFavoriteAnime: [
            {
              id: 17,
              userId: 3,
              animeId: 2,
              anime: { episodes: 0, duration: 0 },
            },
            {
              id: 47,
              userId: 3,
              animeId: 11,
              anime: { episodes: 0, duration: 0 },
            },
            {
              id: 48,
              userId: 3,
              animeId: 14,
              anime: { episodes: 0, duration: 0 },
            },
            {
              id: 49,
              userId: 3,
              animeId: 4,
              anime: { episodes: 0, duration: 0 },
            },
            {
              id: 50,
              userId: 3,
              animeId: 9,
              anime: { episodes: 0, duration: 0 },
            },
            {
              id: 53,
              userId: 3,
              animeId: 1,
              anime: { episodes: 0, duration: 0 },
            },
          ],
          UserStatusAnime: [
            {
              id: 12,
              statusId: 3,
              userId: 3,
              animeId: 11,
              anime: { episodes: 0, duration: 0 },
            },
            {
              id: 9,
              statusId: 3,
              userId: 3,
              animeId: 12,
              anime: { episodes: 0, duration: 0 },
            },
            {
              id: 16,
              statusId: 3,
              userId: 3,
              animeId: 8,
              anime: { episodes: 0, duration: 0 },
            },
            {
              id: 19,
              statusId: 3,
              userId: 3,
              animeId: 5,
              anime: { episodes: 0, duration: 0 },
            },
          ],
        };
      });
    const promise = profileService.getProfileInfosService(USER_ID);

    expect(promise).resolves;
    expect(profileRepository.getProfileByUserId).toBeCalled();
  });

  it("given a not existing user, should call getProfileByUserId", async () => {
    const USER_ID = faker.datatype.number();

    jest
      .spyOn(profileRepository, "getProfileByUserId")
      .mockImplementationOnce((): any => {
        return false;
      });
    const promise = profileService.getProfileInfosService(USER_ID);

    expect(profileRepository.getProfileByUserId).toBeCalled();
    expect(promise).rejects.toEqual(notFoundError("User not found"));
  });
});
