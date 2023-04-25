import { NextFunction, Request, Response } from 'express';

class HttpError extends Error {
  code: number;
  constructor(msg: string, code: number) {
    super(msg);
    this.code = code;
  }
}

export const DuplicateEmailError = new HttpError('Email already exists.', 400);
export const InvalidCredentialError = new HttpError('Email or password incorrect', 401);
export const MissingCredentialError = new HttpError('Missing credentials', 400);

export function errorHandler(error: HttpError, request: Request, response: Response, next: NextFunction): void {
  response.status(error.code).send(error.message);
  next();
}
