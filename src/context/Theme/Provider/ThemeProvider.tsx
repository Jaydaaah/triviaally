import { ReactNode, useEffect, useState } from "react";
import { ThemeContext } from "../ThemeContext";

interface props {
    children?: ReactNode;
}

export default function ThemeProvider({ children }: props) {
    const [theme, setTheme] = useState("");

    useEffect(() => {
        const t = localStorage.getItem("theme");
        if (t) {
            setTheme(t);
        } else {
            const doc_theme = document.querySelector("html")?.getAttribute("data-theme");
            if (doc_theme) {
                setTheme(doc_theme);
            }
        }
    }, []);

    useEffect(() => {
        if (theme) {
            document.querySelector("html")?.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
