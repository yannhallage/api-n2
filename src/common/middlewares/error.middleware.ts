import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/app-error";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (res.headersSent) {
    next(error);
    return;
  }

  const isAppError = error instanceof AppError;
  const statusCode = isAppError ? error.statusCode : 500;
  const message = isAppError ? error.message : "Internal server error";

  res.status(statusCode).json({
    statusCode,
    message,
    path: req.originalUrl,
    ...(isAppError && error.details ? { details: error.details } : {}),
  });
};
