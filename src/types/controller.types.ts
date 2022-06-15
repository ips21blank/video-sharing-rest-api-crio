import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { CustomVideoQuery } from './schema.types';

interface EmptyRequest extends Request {
  params: any;
  body: any;
  query: any;
}

// Search by id
interface VideoRequestByIdParams extends ParamsDictionary {
  id: string;
}
interface VideoRequestById extends EmptyRequest {
  params: VideoRequestByIdParams;
}

// Search by params
interface RawCustomVideoQuery extends ParamsDictionary {
  contentRating: string;
  genre: string;
  title: string;

  sortBy: string;
}
interface RawSearchVideoRequest extends EmptyRequest {
  params: RawCustomVideoQuery;
}
interface SearchVideoRequest extends EmptyRequest {
  params: CustomVideoQuery;
}

export type { VideoRequestById, SearchVideoRequest, RawSearchVideoRequest };
