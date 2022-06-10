import mongoose from 'mongoose';
import { Video } from '@models';
import { ApiError } from '@errors';
import httpStatus from 'http-status';
import {
  CustomVideoQuery,
  UpdateVotes,
  VideoSaveData,
  VOTE_TYPE,
  VOTE_TYPE_CHANGE
} from '@tsTypes';

class VideoService {
  public async getVideoById(id: string | mongoose.Types.ObjectId) {
    let video = await Video.getById(id.toString());
    if (!video)
      throw new ApiError(httpStatus.NOT_FOUND, 'Unable to find video for given id');

    return video;
  }

  public async query(query: CustomVideoQuery) {
    return Video.customVideoQuery(query);
  }

  public async saveVideo(data: VideoSaveData) {
    try {
      return await Video.create(data);
    } catch (err: any) {
      throw new ApiError(httpStatus.BAD_REQUEST, err && err.message);
    }
  }

  public async updateVotes(id: string | mongoose.Types.ObjectId, change: UpdateVotes) {
    // change object validated by Joi.
    try {
      let video = await this.getVideoById(id);
      if (change.vote === VOTE_TYPE.upVote) {
        change.change === VOTE_TYPE_CHANGE.increase
          ? video.upVoteInc()
          : video.upVoteDec();
      } else {
        change.change === VOTE_TYPE_CHANGE.increase
          ? video.downVoteInc()
          : video.downVoteDec();
      }
      video.save();
    } catch (err: any) {
      throw new ApiError(httpStatus.BAD_REQUEST, err && err.message);
    }
  }

  public async updateViews(id: string | mongoose.Types.ObjectId) {
    try {
      let video = await this.getVideoById(id);
      video.addViews();
      video.save();
    } catch (err: any) {
      throw new ApiError(httpStatus.BAD_REQUEST, err && err.message);
    }
  }
}

export { VideoService };
