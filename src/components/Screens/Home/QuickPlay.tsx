import { useEffect, useMemo, useState } from "react";
import { Categories } from "../../../api/OpenTrivia/OpenTrivia.info.json";
import { getLastPlay } from "../../../db/UserLastPlay";
import { useUserAccount } from "../../../context/UserAccount/Hooks/useUserAccount";
import QuickPlayCategory from "./QuickPlayCategory";
import { motion } from "framer-motion";

export default function QuickPlay() {
    const { username } = useUserAccount();
    const [lastPlayedCategory, setLastPlayedCategory] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const categories = useMemo(() => {
        return lastPlayedCategory
            .map((category) => {
                const foundCat = Categories.find(
                    (value) => value.name == category
                );
                return foundCat;
            })
            .filter((value) => value != undefined);
    }, [lastPlayedCategory]);

    useEffect(() => {
        const timeout = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % categories.length);
        }, 3000);
        return () => clearInterval(timeout);
    }, [categories]);

    useEffect(() => {
        if (username) {
            const timeout = setTimeout(async () => {
                setLastPlayedCategory(await getLastPlay(username.name));
            });
            return () => clearTimeout(timeout);
        }
    }, [username]);

    return (
        <motion.div
            initial={{
                y: 100,
                opacity: 0
            }}
            animate={{
                y: 0,
                opacity: 1
            }}
            transition={{
                delay: 0.5
            }}
        >
            <h2 className="text-2xl font-bold leading-loose py-2 pt-4 m-2">
                Quick Play
            </h2>
            <div className="px-5 sm:px-7 md:px-8 lg:px-10 self-center w-full flex">
                <div className="flex-grow rounded-3xl shadow-md border-neutral border-2 carousel h-36 sm:h-40 lg:h-52 w-full">
                    {categories.map(({ name, src, description }, index) => (
                        <div className="carousel-item w-full" key={name}>
                            <QuickPlayCategory currentIndex={currentIndex} index={index} name={name} description={description} src={src} />
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
