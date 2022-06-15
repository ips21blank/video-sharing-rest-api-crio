import { Request as Req, Response as Res } from 'express';
import { VideoService } from '../services';
import { SearchVideoRequest, VideoRequestById } from '../types';
import httpStatus from 'http-status';

const service = new VideoService();

const getVideos = async (req: SearchVideoRequest, res: Res) => {
  res.status(httpStatus.OK).send(await service.query(req.params));
};
const getVideoById = async (req: VideoRequestById, res: Res) => {
  const video = await service.getVideoById(req.params.id);
  res.status(httpStatus.OK).json(video);
};
const addNewVideo = async (req: Req, res: Res) => {
  let video = await service.saveVideo(req.body);
  res.status(httpStatus.CREATED).send(video);
};

const updateVotes = async (req: Req, res: Res) => {
  await service.updateVotes(req.params.videoId, req.body);
  res.status(httpStatus.NO_CONTENT).send();
};
const updateViews = async (req: Req, res: Res) => {
  await service.updateViews(req.params.videoId);
  res.status(httpStatus.NO_CONTENT).send();
};

export { getVideos, getVideoById, addNewVideo, updateVotes, updateViews };
