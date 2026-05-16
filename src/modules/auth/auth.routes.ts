import { Router } from "express";

import { UsersService } from "../users/users.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { jwtAuthGuard } from "./guards/jwt-auth.guard";

const usersService = new UsersService();
const authService = new AuthService(usersService);
const authController = new AuthController(authService, usersService);

export const authRoutes = Router();

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.get("/me", jwtAuthGuard, authController.me);
