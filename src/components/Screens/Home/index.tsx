import ScreenTemplate from "../ScreenTemplate";

// Icons
import { BiSolidPyramid } from "react-icons/bi";
import QuickPlay from "./QuickPlay";
import { motion } from "framer-motion";
import QuickLeaderboard from "./QuickLeaderboard";

export default function Home() {

    return (
        <ScreenTemplate
            overrideClass
            isStatic
            title={
                <motion.div
                    className="flex justify-center drop-shadow text-5xl sm:text-6xl md:text-7xl h-64 bg-primary left-0 w-full fixed z-10"
                    animate={{
                        y: [-50, 0],
                        opacity: [0, 1],
                        borderBottomLeftRadius: [0, "100%"],
                        borderBottomRightRadius: [0, "100%"]
                    }}
                    transition={{
                        duration: 1,
                        ease: "anticipate",
                    }}
                >
                    <p className="flex items-center mx-2 bg-clip-text text-transparent bg-purple-to-pink">
                        Trivi
                        <BiSolidPyramid className="mt-1 text-purple-700" />
                        Ally
                    </p>
                </motion.div>
            }
        >
            <div className="h-72"/>
            <QuickLeaderboard/>
            <QuickPlay />
        </ScreenTemplate>
    );
}
