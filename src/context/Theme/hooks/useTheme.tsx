import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

export default function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("Can't Find ThemeProvider in the ancestral tree");
    }

    return context;
}