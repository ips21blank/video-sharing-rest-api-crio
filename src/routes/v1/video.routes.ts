import { Router } from 'express';
import {
  addNewVideo,
  getVideoById,
  getVideos,
  updateViews,
  updateVotes
} from '@controllers';

const router = Router();

router.get('/', getVideos);
router.get('/:videoId', getVideoById);

router.post('/', addNewVideo);

router.patch('/:videoId/votes', updateVotes);
router.patch('/:videoId/views', updateViews);

export { router };
