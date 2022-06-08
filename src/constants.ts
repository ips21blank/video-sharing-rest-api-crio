import { ValidAgeRating, ValidGenre } from '@tsTypes';

export const validAgeRatings: ValidAgeRating[] = [
  'Anyone',
  '7+',
  '12+',
  '16+',
  '18+'
];

export const validGenre: ValidGenre[] = [
  'Education',
  'Sports',
  'Movies',
  'Comedy',
  'Lifestyle',
  'All'
];

export const videoLinkRegex = /^youtube\.com\/embed\/[a-zA-Z0-9_-]{11}$/;
