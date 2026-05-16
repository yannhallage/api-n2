import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

import { AppError } from "../../common/errors/app-error";
import { env } from "../../config/env";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(dto.email);

    if (existingUser) {
      throw new AppError(409, "email is already used");
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.usersService.create({
      email: dto.email,
      name: dto.name,
      passwordHash,
    });

    return {
      user: this.usersService.toResponse(user),
      accessToken: this.signAccessToken(user.id, user.email),
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) {
      throw new AppError(401, "Invalid credentials");
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);

    if (!passwordMatches) {
      throw new AppError(401, "Invalid credentials");
    }

    return {
      user: this.usersService.toResponse(user),
      accessToken: this.signAccessToken(user.id, user.email),
    };
  }

  private signAccessToken(userId: string, email: string): string {
    const options: SignOptions = {
      expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
    };

    return jwt.sign({ email }, env.JWT_SECRET, {
      ...options,
      subject: userId,
    });
  }
}
