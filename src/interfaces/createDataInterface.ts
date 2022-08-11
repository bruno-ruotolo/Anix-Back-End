import {
  Anime,
  AnimeGenre,
  Gender,
  Genre,
  Season,
  Status,
  User,
  UserFavoriteGenre,
  UserRateAnime,
  UserStatusAnime,
  Year,
} from "@prisma/client";

export type UserCreateData = Omit<User, "id" | "createdAt">;
export type UserFavoriteGenresCreateData = Omit<
  UserFavoriteGenre,
  "id" | "userId"
>;
export type StatusCreateData = Omit<Status, "id">;
export type GenreCreateData = Omit<Genre, "id">;
export type YearCreateData = Omit<Year, "id">;
export type SeasonCreateData = Omit<Season, "id">;
export type AnimeCreateData = Omit<Anime, "id">;
export type GenderCreateData = Omit<Gender, "id">;
export type AnimeGenreCreateData = Omit<AnimeGenre, "id">;
export type SignIn = Omit<UserCreateData, "username" | "image" | "genderId">;
export type RateAnime = Omit<UserRateAnime, "id" | "userId" | "animeId">;
export type StatusAnime = Omit<UserStatusAnime, "id" | "userId" | "animeId">;
