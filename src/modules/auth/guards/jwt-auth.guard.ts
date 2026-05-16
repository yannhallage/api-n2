import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { AppError } from "../../../common/errors/app-error";
import { env } from "../../../config/env";
import { AuthenticatedRequest } from "../types/authenticated-request";

interface JwtPayload {
  sub: string;
  email: string;
}

const extractBearerToken = (authorization?: string): string => {
  if (!authorization) {
    throw new AppError(401, "Authorization header is required");
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new AppError(401, "Authorization header must be Bearer token");
  }

  return token;
};

export const jwtAuthGuard = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  try {
    const token = extractBearerToken(req.headers.authorization);
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    (req as AuthenticatedRequest).user = {
      id: payload.sub,
      email: payload.email,
    };

    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }

    next(new AppError(401, "Invalid or expired token"));
  }
};
