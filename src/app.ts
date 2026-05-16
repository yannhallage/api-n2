import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { errorHandler } from "./common/middlewares/error.middleware";
import { notFoundHandler } from "./common/middlewares/not-found.middleware";
import { corsOptions } from "./config/cors";
import { env } from "./config/env";
import { registerRoutes } from "./routes";

export const createApp = (): Express => {
  const app = express();

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    }),
  );
  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions));
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));

  if (env.NODE_ENV !== "test") {
    app.use(morgan("dev"));
  }

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.use("/api/v1", registerRoutes());

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
