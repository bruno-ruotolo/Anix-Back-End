import searchRepository from "../repositories/searchRepository.js";

async function getAnimesSearch(
  genreSearch: string | string[] | any,
  yearSearch: string | string[] | any,
  inputSearch: string | string[] | any
) {
  const genre: string = genreSearch?.trim().toLowerCase();
  const year: string = yearSearch?.trim().toLowerCase();

  if (genre && !year) {
    const genreAnimes = await searchRepository.getAnimesByGenreId(
      parseInt(genre),
      inputSearch
    );
    return genreAnimes;
  }

  if (year && !genre) {
    const yearAnimes = await searchRepository.getAnimesByYearId(
      parseInt(year),
      inputSearch
    );
    return yearAnimes;
  }

  if (genre && year) {
    const yearAnimes = await searchRepository.getAnimesByGenreAndYearId(
      parseInt(genre),
      parseInt(year),
      inputSearch
    );
    return yearAnimes;
  }

  if (!genre && !year && inputSearch) {
    const inputSearchAnimes = await searchRepository.getAnimesByName(
      inputSearch
    );
    return inputSearchAnimes;
  }

  const allAnimes = await searchRepository.getAllAnimes();
  return allAnimes;
}

async function getAllYearsService() {
  const yearsList = await searchRepository.getAllYears();
  return yearsList;
}

const searchService = { getAnimesSearch, getAllYearsService };
export default searchService;
