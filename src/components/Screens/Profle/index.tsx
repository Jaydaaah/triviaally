import { motion } from "framer-motion";
import { useUserAccount } from "../../../context/UserAccount/Hooks/useUserAccount";
import ScreenTemplate from "../ScreenTemplate";
import { useCallback } from "react";
import ThemeSelector from "./ThemeSelector";

export default function Profile() {
    const { username, logout } = useUserAccount();

    const btnHandler = useCallback(() => {
        logout();
    }, [logout]);

    return (
        <ScreenTemplate title="Profile">
            <div className="h-64 flex flex-col justify-center relative">
                <motion.div
                    initial={{
                        y: -100,
                        opacity: 0,
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                    }}
                    transition={{
                        ease: "anticipate",
                    }}
                    className="flex-grow rounded-b-lg bg-gradient-to-bl from-primary to-secondary"
                />
                <div className="flex-grow bg-transparent" />
                <motion.div
                    initial={{
                        y: -100,
                        opacity: 0,
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                    }}
                    transition={{
                        delay: 0.05,
                        duration: 0.8,
                        ease: "backOut",
                    }}
                    className="avatar mask mask-hexagon-2 drop-shadow self-center absolute"
                >
                    <div className="w-32 h-32 rounded-full">
                        <img src="/blank-dp.png" />
                    </div>
                </motion.div>
            </div>
            <span className="self-center font-serif text-2xl">Hi, there</span>
            <span className="self-center font-bold font-serif text-3xl">{username?.name}</span>
            <div className="divider"></div>
            <div className="flex-grow flex flex-col gap-2">
                <ThemeSelector className="self-center"/>
                <ul className="menu w-full h-full bg-base-100 rounded-box gap-2">
                    <li>
                        <a onClick={btnHandler}>LogOut</a>
                    </li>
                </ul>
            </div>
        </ScreenTemplate>
    );
}
