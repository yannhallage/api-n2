import { Request, Response } from "express";

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    statusCode: 404,
    message: `Cannot ${req.method} ${req.originalUrl}`,
    path: req.originalUrl,
  });
};
