import jwt, { JwtPayload } from "jsonwebtoken";
import { useRouter } from "next/router";

export const securePage = (token: string | null) => {
  const router = useRouter();
  if (token === null) {
    router.push("/login");
  } else {
    let session: JwtPayload = jwt.verify(
      token as string,
      "BOOTCAMP_2023_SECRET_KEY"
    ) as JwtPayload;
    if (session.admin) {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  }
};
