import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";

import { notFoundError } from "../../src/utils/errorUtil.js";
import searchRepository from "../../src/repositories/searchRepository.js";
import searchService from "../../src/service/searchService.js";

jest.mock("../../src/repositories/searchRepository");
jest.resetAllMocks();
jest.clearAllMocks();

describe("search unit tests suite", () => {
  it("given a year, genre query and search queries, should call getAnimesByGenreAndYearId", async () => {
    const GENRE_ID = faker.datatype.number().toString();
    const YEAR_ID = faker.datatype.number().toString();
    const INPUT_SEARCH = faker.name.firstName();

    jest
      .spyOn(searchRepository, "getAnimesByGenreAndYearId")
      .mockImplementationOnce((): any => {
        return true;
      });

    const promise = searchService.getAnimesSearch(
      GENRE_ID,
      YEAR_ID,
      INPUT_SEARCH
    );

    expect(promise).resolves;
    expect(searchRepository.getAnimesByGenreAndYearId).toBeCalled();
  });

  it("given a year and search queries, should call getAnimesByYearId", async () => {
    const GENRE_ID = null;
    const YEAR_ID = faker.datatype.number().toString();
    const INPUT_SEARCH = faker.name.firstName();

    jest
      .spyOn(searchRepository, "getAnimesByYearId")
      .mockImplementationOnce((): any => {
        return true;
      });

    const promise = searchService.getAnimesSearch("", YEAR_ID, INPUT_SEARCH);

    expect(promise).resolves;
    expect(searchRepository.getAnimesByYearId).toBeCalled();
  });

  it("given a genre and search queries, should call getAnimesByGenreId", async () => {
    const GENRE_ID = faker.datatype.number().toString();
    const YEAR_ID = "";
    const INPUT_SEARCH = faker.name.firstName();

    jest
      .spyOn(searchRepository, "getAnimesByGenreId")
      .mockImplementationOnce((): any => {
        return true;
      });

    const promise = searchService.getAnimesSearch(
      GENRE_ID,
      YEAR_ID,
      INPUT_SEARCH
    );

    expect(promise).resolves;

    expect(searchRepository.getAnimesByGenreId).toBeCalled();
  });

  it("given just the search query, should call getAnimesByName", async () => {
    const GENRE_ID = "";
    const YEAR_ID = "";
    const INPUT_SEARCH = faker.name.firstName();

    jest
      .spyOn(searchRepository, "getAnimesByName")
      .mockImplementationOnce((): any => {
        return true;
      });

    const promise = searchService.getAnimesSearch(
      GENRE_ID,
      YEAR_ID,
      INPUT_SEARCH
    );

    expect(promise).resolves;

    expect(searchRepository.getAnimesByName).toBeCalled();
  });

  it("given no query, should call getAllAnimes", async () => {
    const GENRE_ID = "";
    const YEAR_ID = "";
    const INPUT_SEARCH = "";

    jest
      .spyOn(searchRepository, "getAllAnimes")
      .mockImplementationOnce((): any => {
        return true;
      });

    const promise = searchService.getAnimesSearch(
      GENRE_ID,
      YEAR_ID,
      INPUT_SEARCH
    );

    expect(promise).resolves;

    expect(searchRepository.getAllAnimes).toBeCalled();
  });
});

describe("get all years unit tests suite", () => {
  it("should call getAllYears", async () => {
    jest
      .spyOn(searchRepository, "getAllYears")
      .mockImplementationOnce((): any => {
        return true;
      });

    const promise = searchService.getAllYearsService();

    expect(promise).resolves;
    expect(searchRepository.getAllYears).toBeCalled();
  });
});
