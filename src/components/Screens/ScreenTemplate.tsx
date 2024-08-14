import { motion } from "framer-motion";
import { ReactNode } from "react";
import { v4 } from "uuid";

interface Props {
    title: ReactNode | string;
    className?: string;
    children: ReactNode;
    overrideClass?: boolean;
    isStatic?: boolean;
}
export default function ScreenTemplate({
    title,
    children,
    className,
    overrideClass,
    isStatic,
}: Props) {
    return (
        <>
            <header
                key={`${v4()}-${title}`}
                className={`${
                    !overrideClass &&
                    `bg-base-300 text-base-content shadow flex p-4 pt-3 pb-3 top-0 left-0 w-screen z-20 ${
                        !isStatic && "sticky"
                    } justify-center transition-colors duration-1000`
                }  ${className}`}
            >
                <h1 className="text-xl font-semibold">{title}</h1>
            </header>
            <motion.main
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 0.3,
                }}
                className="flex-grow flex flex-col w-full max-w-5xl self-center"
            >
                {children}
            </motion.main>
        </>
    );
}
