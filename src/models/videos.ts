import {
  VideoType,
  VideoModelType,
  VideoQueryHelpers,
  VideoMethods,
  VideoDocument,
  ValidGenre,
  ValidAgeRating,
  SortOpt,
  VideoModelQueryDoc,
  VideoModelQueryArr
} from '@tsTypes';
import { videoLinkRegex, validGenre, validAgeRatings } from '../constants';
import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema<
  VideoType, // for document type - new Video().
  VideoModelType, // for model type - Video
  VideoMethods, // for methods on document
  VideoQueryHelpers // for methods on queries - Video.find().mtd.
>({
  id: { type: mongoose.Types.ObjectId, unique: true, required: true },
  videoLink: {
    type: String,
    validate: (value: any) => typeof value === 'string' && value.match(videoLinkRegex)
  },
  title: { type: String },
  genre: { type: String, enum: validGenre },
  contentRating: { type: String, enum: validAgeRatings },
  releaseDate: { type: Date },
  previewImage: { type: String },
  votes: {
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 }
  },
  viewCount: { type: Number, default: 0 }
});

// Types don't work on methods and statics, so the return type for following
// 2 have been specified explicitly.
// METHODS
videoSchema.method<VideoDocument>('upVote', function (count?: number): void {
  this.votes.upVotes += count ?? 1;
});
videoSchema.method<VideoDocument>('downVote', function (count?: number): void {
  this.votes.downVotes += count ?? 1;
});
videoSchema.method<VideoDocument>('addViews', function (count?: number): void {
  this.viewCount += count ?? 1;
});

// STATICS
videoSchema.static('getById', function (id: string): VideoModelQueryDoc {
  return this.findById(id);
});
videoSchema.static('getAll', function (): VideoModelQueryArr {
  return this.find({});
});

// QUERY HELPERS
videoSchema.query.filterByGenre = function (genre: ValidGenre[]) {
  return this.find({ genre: { $in: genre } });
};
videoSchema.query.filterByContentRating = function (contentRating: ValidAgeRating[]) {
  return this.find({ contentRating: { $in: contentRating } });
};
videoSchema.query.filterByTitle = function (title: string) {
  return this.find({ title: new RegExp(title, 'i') });
};

videoSchema.query.sortByAsc = function (prop: SortOpt) {
  return this.sort({ [prop]: 1 });
};
videoSchema.query.sortByDesc = function (prop: SortOpt) {
  return this.sort({ [prop]: -1 });
};

const Video = mongoose.model<VideoType, VideoModelType>('video', videoSchema);

export { videoSchema, Video };
