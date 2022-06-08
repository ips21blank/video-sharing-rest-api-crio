import mongoose, { HydratedDocument, Query } from 'mongoose';

type ValidAgeRating = 'Anyone' | '7+' | '12+' | '16+' | '18+';
type ValidGenre = 'Education' | 'Sports' | 'Movies' | 'Comedy' | 'Lifestyle' | 'All';

/**
 *
 * Video Document.
 */
interface VideoType {
  id: typeof mongoose.Types.ObjectId;
  videoLink: `youtube.com/embed/${string}`;
  title: string;
  genre: ValidGenre;
  contentRating: ValidAgeRating;
  releaseDate: typeof Date;
  previewImage: string;
  votes: { upVotes: number; downVotes: number };
  viewCount: number;
}
// METHODS - on documents.
interface VideoMethods {
  upVote(count?: number): void;
  downVote(count?: number): void;
  addViews(count?: number): void;
}
// STATICS - on model itself - USED IN MODEL_TYPE
interface VideoStaticMethods {
  getById(id: string): VideoModelQueryDoc;
  getAll(): VideoModelQueryArr;
}

type SortOpt = 'viewCount' | 'releaseDate';
// QUERY HELPERS - methods on queries - USED IN MODEL_TYPE
interface VideoQueryHelpers {
  filterByGenre(this: VideoModelQueryArr, genre: ValidGenre[]): VideoModelQueryArr;
  filterByContentRating(
    this: VideoModelQueryArr,
    ageRatings: ValidAgeRating[]
  ): VideoModelQueryArr;
  filterByTitle(this: VideoModelQueryArr, title: string): VideoModelQueryArr;

  sortByDesc(this: VideoModelQueryArr, prop: SortOpt): VideoModelQueryArr;
  sortByAsc(this: VideoModelQueryArr, prop: SortOpt): VideoModelQueryArr;
}

/**
 * (i) - Video Document
 * = document type + methods.
 */
//
type VideoDocument = HydratedDocument<VideoType, VideoMethods>;

//
/**
 * (ii) - Model - adding STATICS
 * = document type + Query Helpers + Methods.
 * and STATICS are extended.
 * Apparently the VideoType and VideoMethods are to specified spearately
 * (not together in VideoDocument) [DOCs].
 */
//
interface VideoModelType
  extends VideoStaticMethods,
    mongoose.Model<VideoType, VideoQueryHelpers, VideoMethods> {}

//
/**
 * (iii) - Query - Type of Query returned and its methods
 * = (document type + methods) + query helpers (methods).
 */
//
type VideoModelQueryArr = Query<VideoDocument[], VideoDocument, VideoQueryHelpers> &
  VideoQueryHelpers;
type VideoModelQueryDoc = Query<VideoDocument | null, VideoDocument, VideoQueryHelpers> &
  VideoQueryHelpers;
//
//
export type {
  ValidAgeRating,
  ValidGenre,
  SortOpt,
  //
  VideoType,
  VideoDocument,
  VideoMethods,
  VideoStaticMethods,
  VideoQueryHelpers,
  VideoModelQueryDoc,
  VideoModelQueryArr,
  VideoModelType
};
