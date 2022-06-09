import { Request as Req, Response as Res, NextFunction as Next } from 'express';

class ApiError extends Error {
  stack: string = ''; // acutally initialized by Error.captureStackTrade

  constructor(public code: number, message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err: ApiError, req: Req, res: Res, next: Next) => {
  const { code, message, stack } = err;

  console.log(stack);
  res.status(code).send(message);
};

type AsyncControllerType = (req: Req, res: Res, next?: Next) => Promise<any>;

const asyncErrorWrapper =
  (fn: AsyncControllerType) => (req: Req, res: Res, next: Next) => {
    Promise.resolve(fn(req, res, next)).catch((err: ApiError) => next(err));
  };

export { ApiError, errorHandler, asyncErrorWrapper };
