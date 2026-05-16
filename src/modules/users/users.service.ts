import { User } from "@prisma/client";

import { AppError } from "../../common/errors/app-error";
import { prisma } from "../../database/prisma.service";
import { toUserResponseDto } from "./dto/user-response.dto";

interface CreateUserInput {
  email: string;
  passwordHash: string;
  name?: string;
}

export class UsersService {
  findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findByIdOrThrow(id: string): Promise<User> {
    const user = await this.findById(id);

    if (!user) {
      throw new AppError(404, "User not found");
    }

    return user;
  }

  create(input: CreateUserInput): Promise<User> {
    return prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        passwordHash: input.passwordHash,
      },
    });
  }

  toResponse(user: User) {
    return toUserResponseDto(user);
  }
}
