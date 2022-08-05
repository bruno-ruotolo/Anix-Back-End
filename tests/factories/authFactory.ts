import { faker } from "@faker-js/faker";

function createUserInformationBody() {
  const userInformations = {
    email: faker.internet.email(),
    password: "123456Nix$",
    username: faker.internet.userName(),
    image: faker.image.animals(),
    genderId: Math.ceil(Math.random() * 5),
  };

  return userInformations;
}

function createUserFavoriteGenresBody() {
  const createUserFavoriteGenres = {
    firstGenreId: Math.ceil(Math.random() * 30),
    secondGenreId: Math.ceil(Math.random() * 30),
    thirdGenreId: Math.ceil(Math.random() * 30),
  };

  return createUserFavoriteGenres;
}

const authFactory = { createUserInformationBody, createUserFavoriteGenresBody };

export default authFactory;
