import { useContext } from "react";
import { ScreenContext } from "./ScreenContext";

export function useScreenManager() {
    const screenContext = useContext(ScreenContext);

    if (!screenContext) {
        throw new Error("Can't find ScreenManagerProvider in the parent tree");
    }

    return screenContext;
}
