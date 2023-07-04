import { IUserCredentials } from "@/typings";
import { IncomingMessage } from "http";
import jwt from "jsonwebtoken";

export function getUserJson(token: string) {
  try {
    const session = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as IUserCredentials;
    return session;
  } catch (error) {
    return null;
  }
}

export function getAppCookies(req: IncomingMessage) {
  const parsedItems: { [key: string]: string } = {};
  if (req.headers.cookie) {
    const cookiesItems = req.headers.cookie.split("; ");
    cookiesItems.forEach((cookies) => {
      const parsedItem = cookies.split("=");
      parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
    });
  }
  return parsedItems;
}
