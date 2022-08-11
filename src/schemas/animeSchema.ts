import { RateAnime, StatusAnime } from "./../interfaces/createDataInterface";
import Joi from "joi";

const rateSchema = Joi.object<RateAnime>({
  rate: Joi.number().integer().min(1).max(5).required(),
});

const statusSchema = Joi.object<StatusAnime>({
  statusId: Joi.number().integer().min(1).max(3).required(),
});

const animeSchema = {
  rateSchema,
  statusSchema,
};

export default animeSchema;
