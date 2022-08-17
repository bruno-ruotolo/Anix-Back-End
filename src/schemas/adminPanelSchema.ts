import Joi from "joi";

import { AnimeCreateData } from "../interfaces/createDataInterface.js";

const panelSchema = Joi.object<AnimeCreateData & { genres: number[] }>({
  title: Joi.string().required(),
  image: Joi.string().uri().required(),
  episodes: Joi.number().required(),
  duration: Joi.number().required(),
  description: Joi.string().required(),
  yearId: Joi.number().required(),
  seasonId: Joi.number().required(),
  genres: Joi.array().required(),
});

const adminPanelSchema = {
  panelSchema,
};

export default adminPanelSchema;
