import { PrismaClient } from "../generated/prisma/client";

import { env } from "../config/env";

export const prisma = new PrismaClient({
  log: env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
});

export const disconnectPrisma = async (): Promise<void> => {
  await prisma.$disconnect();
};
