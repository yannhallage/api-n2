import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 204,
};
