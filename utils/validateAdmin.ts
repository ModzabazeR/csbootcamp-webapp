import { IUserCredentials } from "@/typings";
import jwt from "jsonwebtoken";

export function validateToken(token: string | null) {
  if (token == null) {
    return null;
  }
  try {
    let validate = jwt.verify(token, "BOOTCAMP_2023_SECRET_KEY") as IUserCredentials;
    return validate.admin;
  } catch (error) {
    return null;
  }
}

export function getUserJson(token: string | null) {
  if (token === null) {
    return null;
  }
  try {
    const session = jwt.verify(
      token,
      "BOOTCAMP_2023_SECRET_KEY"
    ) as IUserCredentials;
    return session;
  } catch (error) {
    return null;
  }
}
