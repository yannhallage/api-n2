import { Router } from "express";

import { jwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

const usersService = new UsersService();
const usersController = new UsersController(usersService);

export const usersRoutes = Router();

usersRoutes.get("/me", jwtAuthGuard, usersController.me);
