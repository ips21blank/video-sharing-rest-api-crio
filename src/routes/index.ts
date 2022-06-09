import { Router } from 'express';
import { router as videoRouter } from './v1/video.routes';

const router = Router();
router.use('/v1/videos', videoRouter);

export { router };
