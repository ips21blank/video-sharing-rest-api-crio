import { ValidAgeRating, ValidGenre } from './types';

export const validAgeRatings: ValidAgeRating[] = ['Anyone', '7+', '12+', '16+', '18+'];

export const validGenre: ValidGenre[] = [
  'Education',
  'Sports',
  'Movies',
  'Comedy',
  'Lifestyle',
  'All'
];

export const validAgeRatingsSet = new Set(validAgeRatings);
export const validGenreSet = new Set(validGenre);

export const videoLinkRegex = /^youtube\.com\/embed\/[a-zA-Z0-9_-]{11}$/;
