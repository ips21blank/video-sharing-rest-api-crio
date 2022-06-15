import { NewVideoRequest } from '../types';
import { validGenre, videoLinkRegex, validAgeRatings } from '../constants';
import Joi from 'joi';
import { ApiError } from '../errors';
import httpStatus from 'http-status';

const reqBodySchema = Joi.object<NewVideoRequest>().keys({
  videoLink: Joi.string().pattern(videoLinkRegex).required(),
  title: Joi.string().required(),
  genre: Joi.string()
    .allow(...validGenre)
    .required(),
  contentRating: Joi.string()
    .allow(...validAgeRatings)
    .required(),
  releaseDate: Joi.date().required(),
  previewImage: Joi.string().required()
});

const VideoSaveReqValidator = (req: Request) => {
  let { error } = reqBodySchema.validate(req.body);
  if (error) throw new ApiError(httpStatus.BAD_REQUEST, error.message);
};

export { VideoSaveReqValidator };
