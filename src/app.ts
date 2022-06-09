import { ApiError, errorHandler } from '@errors';
import express, { Request as Req, Response as Res, NextFunction as Next } from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';
import { router } from './routes';

const app = express();

app.use(helmet);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.use((req: Req, res: Res, next: Next) =>
  next(new ApiError(httpStatus.NOT_FOUND, 'Resource Not Found'))
);
app.use(errorHandler);

export { app };
