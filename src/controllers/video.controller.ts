import { asyncErrorWrapper } from '@errors';
import { Request as Req, Response as Res, NextFunction as Next } from 'express';

const pr = new Promise(() => {});
const getVideos = asyncErrorWrapper((req: Req, res: Res) => pr);
const getVideoById = asyncErrorWrapper((req: Req, res: Res) => pr);

const addNewVideo = asyncErrorWrapper((req: Req, res: Res) => pr);

const updateVotes = asyncErrorWrapper((req: Req, res: Res) => pr);
const updateViews = asyncErrorWrapper((req: Req, res: Res) => pr);

export { getVideos, getVideoById, addNewVideo, updateVotes, updateViews };
