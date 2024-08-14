import { useContext } from "react";
import { UserAccountContext } from "../UserAccountContext";


export function useUserAccount() {
    const userAccount = useContext(UserAccountContext);

    if (!userAccount) {
        throw new Error(
            `useUserAccount: ${userAccount}, Can't retrieve UserAccount Context`
        );
    }
    const [username, logout] = userAccount;

    return {
        username,
        logout,
    };
}
