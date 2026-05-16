import { Response } from "express";

import { asyncHandler } from "../../common/utils/async-handler";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { validateLoginDto } from "./dto/login.dto";
import { validateRegisterDto } from "./dto/register.dto";
import { AuthenticatedRequest } from "./types/authenticated-request";

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  register = asyncHandler(async (req, res) => {
    const result = await this.authService.register(validateRegisterDto(req.body));
    res.status(201).json(result);
  });

  login = asyncHandler(async (req, res) => {
    const result = await this.authService.login(validateLoginDto(req.body));
    res.status(200).json(result);
  });

  me = asyncHandler(async (req, res: Response) => {
    const authRequest = req as AuthenticatedRequest;
    const user = await this.usersService.findByIdOrThrow(authRequest.user.id);

    res.status(200).json({
      user: this.usersService.toResponse(user),
    });
  });
}
