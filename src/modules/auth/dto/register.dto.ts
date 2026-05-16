import {
  assertEmail,
  assertPassword,
  ensureBody,
  readOptionalString,
  readRequiredString,
} from "../../../common/validation/body";

export interface RegisterDto {
  email: string;
  password: string;
  name?: string;
}

export const validateRegisterDto = (body: unknown): RegisterDto => {
  const payload = ensureBody(body);
  const email = readRequiredString(payload, "email").toLowerCase();
  const password = readRequiredString(payload, "password");
  const name = readOptionalString(payload, "name");

  assertEmail(email);
  assertPassword(password);

  return { email, password, name };
};
