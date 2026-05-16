import type { User } from "../../../generated/prisma/client";

export interface UserResponseDto {
  id: string;
  email: string;
  name?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const toUserResponseDto = (user: User): UserResponseDto => ({
  id: user.id,
  email: user.email,
  name: user.name,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
