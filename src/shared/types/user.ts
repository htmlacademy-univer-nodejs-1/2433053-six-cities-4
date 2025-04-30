import { UserType } from "./userTypeEnum.js";

export type User = {
    name: string;
    email: string;
    avatar: string | null;
    type: UserType;
  }
