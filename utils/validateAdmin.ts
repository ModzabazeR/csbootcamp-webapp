import jwt, { JwtPayload } from "jsonwebtoken";
export function varlidateAdminJson(dataJson: any) {
  let validate = jwt.verify(
    dataJson.data.token as string,
    "BOOTCAMP_2023_SECRET_KEY"
  ) as JwtPayload;
  return validate.admin;
}
export function varlidateToken(token: string | null) {
  if (token == null) {
    return null;
  }
  try {
    let validate = jwt.verify(token, "BOOTCAMP_2023_SECRET_KEY") as JwtPayload;  
    return validate.admin;  
  } catch (error) {
    return null;
  }
  
  
}

export function getUserJson(token: string | null) {
  if (token === null) {
    return null;
  }
  const session = jwt.verify(token, "BOOTCAMP_2023_SECRET_KEY") as JwtPayload;
  return session;
}
