import { Anime } from "@prisma/client";
import Joi from "joi";

const panelSchema = Joi.object<Anime>({
  id: Joi.number().required(),
  title: Joi.string().required(),
  image: Joi.string().uri().required(),
  episodes: Joi.number().required(),
  duration: Joi.number().required(),
  description: Joi.string().required(),
  yearId: Joi.number().required(),
  seasonId: Joi.number().required(),
});

const adminPanelSchema = {
  panelSchema,
};

export default adminPanelSchema;
