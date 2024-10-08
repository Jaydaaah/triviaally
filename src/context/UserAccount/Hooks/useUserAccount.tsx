import { useContext } from "react";
import { UserAccountContext } from "../UserAccountContext";


export function useUserAccount() {
    const context = useContext(UserAccountContext);

    if (!context) {
        throw new Error(
            `useUserAccount: ${context}, Can't retrieve UserAccount Context`
        );
    }
    const {UserAccount} = context;
    const [username, logout] = UserAccount;

    return {
        username,
        logout,
    };
}
