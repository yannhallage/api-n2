import { createApp } from "./app";
import { env } from "./config/env";
import { disconnectPrisma } from "./database/prisma.service";

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`API running on http://localhost:${env.PORT}`);
});

const shutdown = (signal: string) => {
  console.log(`${signal} received. Closing server...`);

  server.close(async () => {
    await disconnectPrisma();
    process.exit(0);
  });

  setTimeout(() => {
    process.exit(1);
  }, 10000).unref();
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
