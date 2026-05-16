import {
  assertEmail,
  ensureBody,
  readRequiredString,
} from "../../../common/validation/body";

export interface LoginDto {
  email: string;
  password: string;
}

export const validateLoginDto = (body: unknown): LoginDto => {
  const payload = ensureBody(body);
  const email = readRequiredString(payload, "email").toLowerCase();
  const password = readRequiredString(payload, "password");

  assertEmail(email);

  return { email, password };
};
