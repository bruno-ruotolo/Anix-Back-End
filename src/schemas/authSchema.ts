import Joi from "joi";
import {
  UserCreateData,
  UserFavoriteGenresCreateData,
} from "../interfaces/createDataInterface";

const signUpSchema = Joi.object<
  UserCreateData & { confirmPassword?: String } & UserFavoriteGenresCreateData
>({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),
  confirmPassword: Joi.ref("password"),
  username: Joi.string().required(),
  image: Joi.string().uri().required(),
  genderId: Joi.number().required(),
  firstGenreId: Joi.number().required(),
  secondGenreId: Joi.number().required(),
  thirdGenreId: Joi.number().required(),
});

const signInSchema = Joi.object<UserCreateData>({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),
});

const authSchema = {
  signUpSchema,
  signInSchema,
};

export default authSchema;
