import { AppError } from "../errors/app-error";

type BodyRecord = Record<string, unknown>;

export const ensureBody = (body: unknown): BodyRecord => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new AppError(400, "Request body must be a JSON object");
  }

  return body as BodyRecord;
};

export const readRequiredString = (
  body: BodyRecord,
  field: string,
): string => {
  const value = body[field];

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new AppError(400, `${field} is required`);
  }

  return value.trim();
};

export const readOptionalString = (
  body: BodyRecord,
  field: string,
): string | undefined => {
  const value = body[field];

  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== "string") {
    throw new AppError(400, `${field} must be a string`);
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

export const assertEmail = (email: string): void => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    throw new AppError(400, "email must be valid");
  }
};

export const assertPassword = (password: string): void => {
  if (password.length < 8) {
    throw new AppError(400, "password must contain at least 8 characters");
  }

  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    throw new AppError(
      400,
      "password must contain at least one letter and one number",
    );
  }
};
