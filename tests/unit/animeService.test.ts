import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";

import animeService from "../../src/service/animeService.js";
import animeRepository from "../../src/repositories/animeRepository.js";
import {
  badRequestError,
  conflictError,
  notFoundError,
} from "../../src/utils/errorUtil.js";

jest.mock("../../src/repositories/homeRepository");
jest.resetAllMocks();
jest.clearAllMocks();

//INFOS
describe("anime infos unit tests suite", () => {
  it("given a valid anime, should call getAnimeByUserId", async () => {
    const USER_ID = faker.datatype.number({ min: 1, max: 100 });
    const ANIME_ID = faker.datatype.number({ min: 1, max: 100 });

    jest
      .spyOn(animeRepository, "getAnimeByAnimeIdAndUserId")
      .mockImplementationOnce((): any => {
        return { id: ANIME_ID };
      });

    await animeService.animeInfosService(ANIME_ID, USER_ID);

    expect(animeService.animeInfosService).resolves;
    expect(animeRepository.getAnimeByAnimeIdAndUserId).toBeCalled();
  });

  it("given a invalid anime, should call notFoundError", async () => {
    const USER_ID = faker.datatype.number({ min: 1, max: 100 });
    const ANIME_ID = faker.datatype.number({ min: 1, max: 100 });
    jest
      .spyOn(animeRepository, "getAnimeByAnimeIdAndUserId")
      .mockImplementationOnce((): any => {});

    const promise = animeService.animeInfosService(ANIME_ID, USER_ID);

    expect(promise).rejects.toEqual(notFoundError("Anime Not Found"));
  });
});

//RATE
describe("anime rate unit tests suite", () => {
  it("given a valid anime, should call createUserRateAnime", async () => {
    const USER_ID = faker.datatype.number({ min: 1, max: 100 });
    const ANIME_ID = faker.datatype.number({ min: 1, max: 100 });
    const RATE = faker.datatype.number({ min: 1, max: 5 });

    jest
      .spyOn(animeRepository, "getAnimeByAnimeIdAndUserId")
      .mockImplementationOnce((): any => {
        return { id: ANIME_ID };
      });

    jest
      .spyOn(animeRepository, "createUserRateAnime")
      .mockImplementationOnce((): any => {});

    await animeService.animeCreateRateService(ANIME_ID, USER_ID, RATE);

    expect(animeService.animeCreateRateService).resolves;
    expect(animeRepository.getAnimeByAnimeIdAndUserId).toBeCalled();
    expect(animeRepository.createUserRateAnime).toBeCalled();
  });

  it("given a invalid anime, should call notFoundError", async () => {
    const USER_ID = faker.datatype.number({ min: 1, max: 100 });
    const ANIME_ID = faker.datatype.number({ min: 1, max: 100 });
    const RATE = faker.datatype.number({ min: 1, max: 5 });

    jest
      .spyOn(animeRepository, "getAnimeByAnimeIdAndUserId")
      .mockImplementationOnce((): any => {});

    const promise = animeService.animeCreateRateService(
      ANIME_ID,
      USER_ID,
      RATE
    );

    expect(promise).rejects.toEqual(notFoundError("Anime Not Found"));
  });
});

//FAVORITE
describe("anime create favorite unit tests suite", () => {
  it("given a valid anime, should call createUserRateAnime", async () => {
    const USER_ID = faker.datatype.number({ min: 1, max: 100 });
    const ANIME_ID = faker.datatype.number({ min: 1, max: 100 });

    jest
      .spyOn(animeRepository, "getAnimeByAnimeIdAndUserId")
      .mockImplementationOnce((): any => {
        return { id: ANIME_ID };
      });

    jest
      .spyOn(animeRepository, "getFavoriteAnimeByUserIdAndAnimeId")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(animeRepository, "createUserFavoriteAnime")
      .mockImplementationOnce((): any => {});

    await animeService.animeCreateFavoriteService(ANIME_ID, USER_ID);

    expect(animeService.animeCreateFavoriteService).resolves;
    expect(animeRepository.getAnimeByAnimeIdAndUserId).toBeCalled();
    expect(animeRepository.getFavoriteAnimeByUserIdAndAnimeId).toBeCalled();
    expect(animeRepository.createUserFavoriteAnime).toBeCalled();
  });

  it("given a invalid anime, should call notFoundError", async () => {
    const USER_ID = faker.datatype.number({ min: 1, max: 100 });
    const ANIME_ID = faker.datatype.number({ min: 1, max: 100 });

    jest
      .spyOn(animeRepository, "getAnimeByAnimeIdAndUserId")
      .mockImplementationOnce((): any => {});

    const promise = animeService.animeCreateFavoriteService(ANIME_ID, USER_ID);

    expect(promise).rejects.toEqual(notFoundError("Anime Not Found"));
  });

  it("given a already favorited anime, should call conflictError", async () => {
    const USER_ID = faker.datatype.number({ min: 1, max: 100 });
    const ANIME_ID = faker.datatype.number({ min: 1, max: 100 });

    jest
      .spyOn(animeRepository, "getAnimeByAnimeIdAndUserId")
      .mockImplementationOnce((): any => {
        return { id: ANIME_ID };
      });

    jest
      .spyOn(animeRepository, "getFavoriteAnimeByUserIdAndAnimeId")
      .mockImplementationOnce((): any => {
        return { id: ANIME_ID };
      });

    const promise = animeService.animeCreateFavoriteService(ANIME_ID, USER_ID);

    expect(animeRepository.getAnimeByAnimeIdAndUserId).toBeCalled();
    expect(animeRepository.getFavoriteAnimeByUserIdAndAnimeId).toBeCalled();
    expect(promise).rejects.toEqual(
      conflictError("You've already favorited this anime")
    );
  });
});

describe("anime delete favorite unit tests suite", () => {
  it("given a valid anime, should call deleteUserFavoriteAnime", async () => {
    const USER_ID = faker.datatype.number({ min: 1, max: 100 });
    const ANIME_ID = faker.datatype.number({ min: 1, max: 100 });

    jest
      .spyOn(animeRepository, "getAnimeByAnimeIdAndUserId")
      .mockImplementationOnce((): any => {
        return { id: ANIME_ID };
      });

    jest
      .spyOn(animeRepository, "getFavoriteAnimeByUserIdAndAnimeId")
      .mockImplementationOnce((): any => {
        return { id: ANIME_ID };
      });

    jest
      .spyOn(animeRepository, "deleteUserFavoriteAnime")
      .mockImplementationOnce((): any => {});

    await animeService.animeDeleteFavoriteService(ANIME_ID, USER_ID);

    expect(animeService.animeDeleteFavoriteService).resolves;
    expect(animeRepository.getAnimeByAnimeIdAndUserId).toBeCalled();
    expect(animeRepository.getFavoriteAnimeByUserIdAndAnimeId).toBeCalled();
    expect(animeRepository.deleteUserFavoriteAnime).toBeCalled();
  });

  it("given a invalid anime, should call notFoundError", async () => {
    const USER_ID = faker.datatype.number({ min: 1, max: 100 });
    const ANIME_ID = faker.datatype.number({ min: 1, max: 100 });

    jest
      .spyOn(animeRepository, "getAnimeByAnimeIdAndUserId")
      .mockImplementationOnce((): any => {});

    const promise = animeService.animeDeleteFavoriteService(ANIME_ID, USER_ID);

    expect(promise).rejects.toEqual(notFoundError("Anime Not Found"));
  });

  it("given a not favorited anime, should call badRequestError", async () => {
    const USER_ID = faker.datatype.number({ min: 1, max: 100 });
    const ANIME_ID = faker.datatype.number({ min: 1, max: 100 });

    jest
      .spyOn(animeRepository, "getAnimeByAnimeIdAndUserId")
      .mockImplementationOnce((): any => {
        return { id: ANIME_ID };
      });

    jest
      .spyOn(animeRepository, "getFavoriteAnimeByUserIdAndAnimeId")
      .mockImplementationOnce((): any => {});

    const promise = animeService.animeDeleteFavoriteService(ANIME_ID, USER_ID);

    expect(animeRepository.getAnimeByAnimeIdAndUserId).toBeCalled();
    expect(animeRepository.getFavoriteAnimeByUserIdAndAnimeId).toBeCalled();
    expect(promise).rejects.toEqual(
      badRequestError("The Anime isn't First Favorited to Unfavorite")
    );
  });
});

//STATUS
describe("anime create status unit tests suite", () => {
  it("given a valid anime, should call createUserStatusAnime", async () => {
    const USER_ID = faker.datatype.number({ min: 1, max: 100 });
    const ANIME_ID = faker.datatype.number({ min: 1, max: 100 });
    const STATUS = faker.datatype.number({ min: 1, max: 3 });

    jest
      .spyOn(animeRepository, "getAnimeByAnimeIdAndUserId")
      .mockImplementationOnce((): any => {
        return true;
      });

    jest
      .spyOn(animeRepository, "createUserStatusAnime")
      .mockImplementationOnce((): any => {});

    await animeService.animeCreateStatusService(ANIME_ID, USER_ID, STATUS);

    expect(animeService.animeCreateStatusService).resolves;
    expect(animeRepository.getAnimeByAnimeIdAndUserId).toBeCalled();
    expect(animeRepository.createUserStatusAnime).toBeCalled();
  });

  it("given a invalid anime, should call notFoundError", async () => {
    const USER_ID = faker.datatype.number({ min: 1, max: 100 });
    const ANIME_ID = faker.datatype.number({ min: 1, max: 100 });
    const STATUS = faker.datatype.number({ min: 1, max: 3 });

    jest
      .spyOn(animeRepository, "getAnimeByAnimeIdAndUserId")
      .mockImplementationOnce((): any => {});

    const promise = animeService.animeCreateStatusService(
      ANIME_ID,
      USER_ID,
      STATUS
    );

    expect(promise).rejects.toEqual(notFoundError("Anime Not Found"));
  });

  // it("given a anime that already has a status , should call badRequestError", async () => {
  //   const USER_ID = faker.datatype.number({ min: 1, max: 100 });
  //   const ANIME_ID = faker.datatype.number({ min: 1, max: 100 });
  //   const STATUS = faker.datatype.number({ min: 1, max: 3 });

  //   jest
  //     .spyOn(animeRepository, "getAnimeByAnimeIdAndUserId")
  //     .mockImplementationOnce((): any => {
  //       return { id: ANIME_ID };
  //     });

  //   jest
  //     .spyOn(animeRepository, "getStatusAnimeByUserIdAndAnimeId")
  //     .mockImplementationOnce((): any => {
  //       return { id: ANIME_ID };
  //     });

  //   const promise = animeService.animeCreateStatusService(
  //     ANIME_ID,
  //     USER_ID,
  //     STATUS
  //   );

  //   expect(animeRepository.getAnimeByAnimeIdAndUserId).toBeCalled();
  //   expect(animeRepository.getStatusAnimeByUserIdAndAnimeId).toBeCalled();
  //   expect(promise).rejects.toEqual(
  //     badRequestError("You've already gave a status to this anime")
  //   );
  // });
});

describe("anime delete status unit tests suite", () => {
  it("given a valid anime, should call deleteUserStatusAnime", async () => {
    const USER_ID = faker.datatype.number({ min: 1, max: 100 });
    const ANIME_ID = faker.datatype.number({ min: 1, max: 100 });

    jest
      .spyOn(animeRepository, "getAnimeByAnimeIdAndUserId")
      .mockImplementationOnce((): any => {
        return true;
      });

    jest
      .spyOn(animeRepository, "getStatusAnimeByUserIdAndAnimeId")
      .mockImplementationOnce((): any => {
        return true;
      });

    jest
      .spyOn(animeRepository, "deleteUserStatusAnime")
      .mockImplementationOnce((): any => {});

    await animeService.animeDeleteStatusService(ANIME_ID, USER_ID);

    expect(animeService.animeDeleteStatusService).resolves;
    expect(animeRepository.getAnimeByAnimeIdAndUserId).toBeCalled();
    expect(animeRepository.getStatusAnimeByUserIdAndAnimeId).toBeCalled();
    expect(animeRepository.deleteUserStatusAnime).toBeCalled();
  });

  it("given a invalid anime, should call notFoundError", async () => {
    const USER_ID = faker.datatype.number({ min: 1, max: 100 });
    const ANIME_ID = faker.datatype.number({ min: 1, max: 100 });

    jest
      .spyOn(animeRepository, "getAnimeByAnimeIdAndUserId")
      .mockImplementationOnce((): any => {});

    const promise = animeService.animeDeleteStatusService(ANIME_ID, USER_ID);

    expect(promise).rejects.toEqual(notFoundError("Anime Not Found"));
  });

  it("given a not status anime, should call badRequestError", async () => {
    const USER_ID = faker.datatype.number({ min: 1, max: 100 });
    const ANIME_ID = faker.datatype.number({ min: 1, max: 100 });

    jest
      .spyOn(animeRepository, "getAnimeByAnimeIdAndUserId")
      .mockImplementationOnce((): any => true);

    jest
      .spyOn(animeRepository, "getStatusAnimeByUserIdAndAnimeId")
      .mockImplementationOnce((): any => {});

    const promise = animeService.animeDeleteStatusService(ANIME_ID, USER_ID);

    expect(animeRepository.getAnimeByAnimeIdAndUserId).toBeCalled();
    expect(animeRepository.getStatusAnimeByUserIdAndAnimeId).toBeCalled();
    expect(promise).rejects.toEqual(
      badRequestError("The Anime hasn't any status to remove")
    );
  });
});

//GET ALL STATUS
describe("get all genres status unit tests suite", () => {
  it(" should call getAllStatusAnime", async () => {
    jest
      .spyOn(animeRepository, "getAllStatusAnime")
      .mockImplementationOnce((): any => {
        return true;
      });

    await animeService.animeGetStatusService();

    expect(animeService.animeGetStatusService).resolves;
    expect(animeRepository.getAllStatusAnime).toBeCalled();
  });
});
