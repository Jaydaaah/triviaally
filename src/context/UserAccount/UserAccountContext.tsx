import { createContext } from "react";

export interface UserAccount {
    name: string;
    src?: string;
}
export const UserAccountContext = createContext<
    [UserAccount | undefined, () => void] | undefined
>(undefined);
