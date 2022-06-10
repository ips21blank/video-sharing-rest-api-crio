import mongoose, { HydratedDocument, Query } from 'mongoose';

type ValidAgeRating = 'Anyone' | '7+' | '12+' | '16+' | '18+';
type ValidGenre = 'Education' | 'Sports' | 'Movies' | 'Comedy' | 'Lifestyle' | 'All';
interface CustomVideoQuery {
  contentRating?: ValidAgeRating[];
  genre?: ValidGenre[];
  title?: string;

  sortBy?: SortByOption;
}
enum SortByOption { // Exported as object not type: so that the string values can be read.
  viewCount = 'viewCount',
  releaseDate = 'releaseDate' // default : to be set by Joi validation.
}

/**
 *
 * Video Document.
 */
interface VideoSaveData {
  videoLink: `youtube.com/embed/${string}`;
  title: string;
  genre: ValidGenre;
  contentRating: ValidAgeRating;
  releaseDate: typeof Date;
  previewImage: string;
}
interface VideoType extends VideoSaveData {
  id: typeof mongoose.Types.ObjectId;
  votes: { upVotes: number; downVotes: number };
  viewCount: number;
}
// METHODS - on documents.
interface VideoMethods {
  upVoteInc(count?: number): void;
  upVoteDec(count?: number): void;
  downVoteInc(count?: number): void;
  downVoteDec(count?: number): void;
  addViews(count?: number): void;
  // decViews(count?: number): void;
}
// STATICS - on model itself - USED IN MODEL_TYPE
interface VideoStaticMethods {
  getById(id: string): VideoModelQueryDoc;
  getAll(): VideoModelQueryArr;
  customVideoQuery(query: CustomVideoQuery): VideoModelQueryArr;
}

// QUERY HELPERS - methods on queries - USED IN MODEL_TYPE
interface VideoQueryHelpers {
  filterByGenre(this: VideoModelQueryArr, genre?: ValidGenre[]): VideoModelQueryArr;
  filterByContentRating(
    this: VideoModelQueryArr,
    ageRatings?: ValidAgeRating[]
  ): VideoModelQueryArr;
  filterByTitle(this: VideoModelQueryArr, title?: string): VideoModelQueryArr;

  sortByDesc(this: VideoModelQueryArr, prop?: SortByOption): VideoModelQueryArr;
  // Following is not to be added (as per the doc).
  // sortByAsc(this: VideoModelQueryArr, prop: SortByOption): VideoModelQueryArr;
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
export { SortByOption };
// prettier-ignore
export type {
  ValidAgeRating, ValidGenre, CustomVideoQuery,
  //
  VideoSaveData, VideoType, VideoDocument,
  VideoMethods, VideoStaticMethods, VideoQueryHelpers,
  VideoModelQueryDoc, VideoModelQueryArr,
  VideoModelType
};
