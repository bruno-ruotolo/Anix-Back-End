import { faker } from "@faker-js/faker";

function createUserInformationBody() {
  const GENDER_QUANTITY = 5;
  const userInformations = {
    email: faker.internet.email(),
    password: "123456Nix$",
    username: faker.internet.userName(),
    image: faker.image.animals(),
    genderId: Math.ceil(Math.random() * GENDER_QUANTITY),
  };

  return userInformations;
}

function createUserFavoriteGenresBody() {
  const GENRE_QUANTITY = 30;
  const createUserFavoriteGenres = {
    firstGenreId: Math.ceil(Math.random() * GENRE_QUANTITY),
    secondGenreId: Math.ceil(Math.random() * GENRE_QUANTITY),
    thirdGenreId: Math.ceil(Math.random() * GENRE_QUANTITY),
  };

  return createUserFavoriteGenres;
}

const authFactory = { createUserInformationBody, createUserFavoriteGenresBody };

export default authFactory;
