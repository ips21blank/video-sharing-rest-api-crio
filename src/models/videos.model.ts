import {
  VideoType,
  VideoModelType,
  VideoQueryHelpers,
  VideoMethods,
  VideoDocument,
  ValidGenre,
  ValidAgeRating,
  SortByOption,
  VideoModelQueryDoc,
  VideoModelQueryArr,
  CustomVideoQuery
} from '../types';
import { videoLinkRegex, validGenre, validAgeRatings } from '../constants';
import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema<
  VideoType, // for document type - new Video().
  VideoModelType, // for model type - Video
  VideoMethods, // for methods on document
  VideoQueryHelpers // for methods on queries - Video.find().mtd.
>({
  id: { type: mongoose.Types.ObjectId, unique: true },
  videoLink: {
    type: String,
    required: true,
    validate: (value: any) => typeof value === 'string' && value.match(videoLinkRegex)
  },
  title: { type: String, required: true },
  genre: { type: String, enum: validGenre, required: true },
  contentRating: { type: String, enum: validAgeRatings, required: true },
  releaseDate: { type: Date, required: true },
  previewImage: { type: String, required: true },
  votes: {
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 }
  },
  viewCount: { type: Number, default: 0 }
});

// Types don't work on methods and statics, so the return type for following
// 2 have been specified explicitly.
// METHODS
// upvotes
videoSchema.method<VideoDocument>('upVoteInc', function (count?: number): void {
  this.votes.upVotes += count ?? 1;
});
videoSchema.method<VideoDocument>('upVoteDec', function (count?: number): void {
  this.votes.upVotes -= count ?? 1;
});
// downvotes
videoSchema.method<VideoDocument>('downVoteInc', function (count?: number): void {
  this.votes.downVotes += count ?? 1;
});
videoSchema.method<VideoDocument>('downVoteDec', function (count?: number): void {
  this.votes.downVotes -= count ?? 1;
});
// view count
videoSchema.method<VideoDocument>('addViews', function (count?: number): void {
  this.viewCount += count ?? 1;
});
// videoSchema.method<VideoDocument>('decViews', function (count?: number): void {
//   this.viewCount -= count ?? 1;
// });

// STATICS
videoSchema.static('getById', function (id: string): VideoModelQueryDoc {
  return this.findById(id);
});
videoSchema.static('getAll', function (): VideoModelQueryArr {
  return this.find({});
});
videoSchema.static(
  'customVideoQuery',
  function (query: CustomVideoQuery): VideoModelQueryArr {
    let queryObject: any = {};

    if (query.contentRating) queryObject.contentRating = { $in: query.contentRating };
    if (query.genre) queryObject.genre = { $in: query.genre };
    if (query.title) queryObject.title = new RegExp(query.title, 'i');

    return this.find(queryObject).sort(query.sortBy || SortByOption.releaseDate);

    // SLOWER (probably)
    // return this.find({})
    //   .filterByContentRating(query.contentRating)
    //   .filterByGenre(query.genre)
    //   .filterByTitle(query.title)
    //   .sortByDesc(query.sortBy);
  }
);

// QUERY HELPERS
videoSchema.query.filterByGenre = function (genre?: ValidGenre[]) {
  return genre ? this.find({ genre: { $in: genre } }) : this;
};
videoSchema.query.filterByContentRating = function (contentRating?: ValidAgeRating[]) {
  return contentRating ? this.find({ contentRating: { $in: contentRating } }) : this;
};
videoSchema.query.filterByTitle = function (title?: string) {
  return title ? this.find({ title: new RegExp(title, 'i') }) : this;
};

// Following is not to be added (as per the doc).
// videoSchema.query.sortByAsc = function (prop: SortByOption) {
//   return this.sort({ [prop]: 1 });
// };
videoSchema.query.sortByDesc = function (prop?: SortByOption) {
  return this.sort({ [prop || SortByOption.releaseDate]: -1 });
};

// videoSchema.virtual('id').get(function () {
//   return this._id.toHexString();
// });
videoSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

const Video = mongoose.model<VideoType, VideoModelType>('video', videoSchema);

export { videoSchema, Video };
