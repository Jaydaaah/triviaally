// Icons
import { motion } from "framer-motion";
import { FaCrown } from "react-icons/fa";
import { TbHexagonNumber3 } from "react-icons/tb";
import { TbHexagonNumber2 } from "react-icons/tb";
import { TbHexagonNumber1 } from "react-icons/tb";

interface props {
    className?: string;
    name: string;
    score: number;
    rank?: "1st" | "2nd" | "3rd";
}
<FaCrown />;
export default function LeaderCard({ className, name, score, rank }: props) {
    return (
        <motion.div
            className={`even:z-20 z-10 flex flex-col items-center justify-center
                w-28 h-32
                shadow-lg bg-base-200 text-base-content bg-opacity-70 filter backdrop-blur-sm rounded-3xl
                outline
                outline-2
                ${rank == "1st" && "outline-rank-legend"}
                ${rank == "2nd" && "outline-rank-epic"}
                ${rank == "3rd" && "outline-rank-rare"}
                ${className}
            `}
            drag
            dragSnapToOrigin
            animate={{
                scale: [0, (rank == "1st" ? 1.25 : 1)]
            }}
            transition={{
                delay: (rank == "1st" ? 0.12 : (rank == "2nd" ? 0.07 : 0)),
                duration: 0.5,
                ease: "backOut"
            }}
        >
            <h1 className="flex flex-col items-center gap-2 relative">
                <span
                    className={`drop-shadow absolute text-4xl -translate-y-14`}
                >
                    {rank == "1st" && (
                        <FaCrown className="text-rank-legend text-5xl -translate-y-4" />
                    )}
                </span>
                <p className="font-bold font-serif text-xl">{name}</p>
            </h1>
            <span className="text-info font-bold">{score}</span>
            <span className={`drop-shadow absolute text-2xl translate-y-16 rounded-full p-[2px] text-white
                    
                ${rank == "1st" && "bg-rank-legend"}
                ${rank == "2nd" && "bg-rank-epic"}
                ${rank == "3rd" && "bg-rank-rare"}
                `}>
                {rank == "1st" && <TbHexagonNumber1 />}
                {rank == "2nd" && <TbHexagonNumber2 />}
                {rank == "3rd" && <TbHexagonNumber3 />}
            </span>
        </motion.div>
    );
}
