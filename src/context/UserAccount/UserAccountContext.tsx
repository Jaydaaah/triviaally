import { createContext } from "react";

export interface UserAccount {
    name: string;
    src?: string;
}
export const UserAccountContext = createContext<
    | {
          UserAccount: [UserAccount | undefined, () => void];
          UserList: UserAccount[];
      }
    | undefined
>(undefined);