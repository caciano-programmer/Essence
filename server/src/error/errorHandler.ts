import { NextFunction, Request, Response } from 'express';

export class HttpError extends Error {
  code: number;
  constructor(msg: string, code: number) {
    super(msg);
    this.code = code;
  }
}

export function errorHandler(error: HttpError, request: Request, response: Response, next: NextFunction): void {
  response.status(error.code).send(error.message);
  next();
}
