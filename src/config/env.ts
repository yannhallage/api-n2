import "dotenv/config";

type NodeEnv = "development" | "test" | "production";

const readRequiredEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

const readPort = (): number => {
  const value = Number(process.env.PORT ?? 3000);

  if (!Number.isInteger(value) || value <= 0) {
    throw new Error("PORT must be a positive integer");
  }

  return value;
};

const readNodeEnv = (): NodeEnv => {
  const value = process.env.NODE_ENV ?? "development";

  if (!["development", "test", "production"].includes(value)) {
    throw new Error("NODE_ENV must be development, test, or production");
  }

  return value as NodeEnv;
};

export const env = {
  NODE_ENV: readNodeEnv(),
  PORT: readPort(),
  DATABASE_URL: readRequiredEnv("DATABASE_URL"),
  JWT_SECRET: readRequiredEnv("JWT_SECRET"),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "15m",
} as const;
