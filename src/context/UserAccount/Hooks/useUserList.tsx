import { useContext } from "react";
import { UserAccountContext } from "../UserAccountContext";


export function useUserList() {
    const context = useContext(UserAccountContext);

    if (!context) {
        throw new Error(
            `useUserAccount: ${context}, Can't retrieve UserAccount Context`
        );
    }
    const {UserList} = context;

    return {UserList};
}
