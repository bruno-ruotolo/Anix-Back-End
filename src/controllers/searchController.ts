import { Request, Response } from "express";

import searchService from "../service/searchService.js";

export async function getAnimesSearchController(req: Request, res: Response) {
  const genreSearch = req.query.g;
  const yearSearch = req.query.y;
  const inputSearch = req.query.s;
  const animeList = await searchService.getAnimesSearch(
    genreSearch,
    yearSearch,
    inputSearch
  );

  res.status(200).send(animeList);
}

export async function getAllYearsController(req: Request, res: Response) {
  const yearsList = await searchService.getAllYearsService();

  res.status(200).send(yearsList);
}
