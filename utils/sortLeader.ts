import { IUser } from "@/typings";

export function compareLeader(a: IUser, b: IUser) {
  return a.point - b.point;
}
