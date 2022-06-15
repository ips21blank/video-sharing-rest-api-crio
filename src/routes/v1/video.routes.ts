import { Router } from 'express';
import {
  addNewVideo,
  getVideoById,
  getVideos,
  updateViews,
  updateVotes
} from '../../controllers';
import { VideoSaveReqValidator, videoSearchReqParser } from '../../middlewares';
import { asyncErrorWrapper } from '../../errors';

const router = Router();

router.get('/', videoSearchReqParser, asyncErrorWrapper(getVideos));
router.get('/:videoId', asyncErrorWrapper(getVideoById));

router.post('/', VideoSaveReqValidator, asyncErrorWrapper(addNewVideo));

router.patch('/:videoId/votes', asyncErrorWrapper(updateVotes));
router.patch('/:videoId/views', asyncErrorWrapper(updateViews));

export { router };
