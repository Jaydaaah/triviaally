import { ReactNode } from "react";
import { useScreenManager } from "./context/useScreenManager";

export function FooterNavTabBtn({
    children, title, index,
}: {
    children?: ReactNode;
    className?: string;
    title?: string;
    index: number;
}) {
    const { screen, setScreen } = useScreenManager();

    return (
        <button
            className={`${screen == index ? "opacity-100" : "opacity-20"} transition-all duration-500`}
            onClick={() => {
                setScreen(index);
            }}
        >
            {!!children && <span className={`text-xl ${screen == index && "scale-125"} transition-transform duration-300`}>{children}</span>}
            {!!title && <span className="btm-nav-label text-[8pt] md:text-sm">{title}</span>}
        </button>
    );
}
