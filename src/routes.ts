import { Router } from "express";

import { authRoutes } from "./modules/auth/auth.routes";
import { usersRoutes } from "./modules/users/users.routes";

export const registerRoutes = (): Router => {
  const router = Router();

  router.use("/auth", authRoutes);
  router.use("/users", usersRoutes);

  return router;
};
