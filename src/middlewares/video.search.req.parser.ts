import { Response, NextFunction } from 'express';
import {
  RawSearchVideoRequest as Req,
  CustomVideoQuery,
  ValidAgeRating,
  ValidGenre,
  SortByOption
} from '../types';
import { validAgeRatingsSet, validGenreSet } from '../constants';

const videoSearchReqParser = (req: Req, res: Response, next: NextFunction) => {
  let { contentRating, genre, title, sortBy } = req.params;

  let body: CustomVideoQuery = {};
  if (contentRating) {
    let ratings = contentRating.split(',');
    body.contentRating = <ValidAgeRating[]>(
      ratings.filter((rating) => validAgeRatingsSet.has(<any>rating))
    );
  }
  if (genre) {
    let genres = genre.split(',');
    body.genre = <ValidGenre[]>genres.filter((rating) => validGenreSet.has(<any>rating));
  }
  if (title) body.title = title;
  if (sortBy) {
    body.sortBy =
      sortBy === SortByOption.viewCount
        ? SortByOption.viewCount
        : SortByOption.releaseDate;
  }

  req.body = body;

  next();
};

export { videoSearchReqParser };
