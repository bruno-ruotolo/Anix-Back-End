import { Anime, AnimeGenre, Gender, Genre, Season, Status, Year } from "@prisma/client";


export type StatusCreateData = Omit<Status, "id">;
export type GenreCreateData = Omit<Genre, "id">;
export type YearCreateData = Omit<Year, "id">;
export type SeasonCreateData = Omit<Season, "id">;
export type AnimeCreateData = Omit<Anime, "id">;
export type GenderCreateData = Omit<Gender, "id">;
export type AnimeGenreCreateData = Omit<AnimeGenre, "id">;
