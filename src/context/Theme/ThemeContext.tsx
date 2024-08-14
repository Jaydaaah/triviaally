import { createContext, Dispatch, SetStateAction } from "react";

export const ThemeContext = createContext<{
    theme: string;
    setTheme: Dispatch<SetStateAction<string>>;
}
| undefined>(undefined);