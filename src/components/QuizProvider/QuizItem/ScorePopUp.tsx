import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface props {
    score: number;
}

export default function ScorePopUp({ score }: props) {
    const [text, setText] = useState("");
    const [color, setColor] = useState<"text-success" | "text-warning" | "text-error" | "">("");

    useEffect(() => {
        if (!text && score) {
            setText(`+${score}`);
            if (score >= 100) {
                setColor("text-success");
            } else if (score < 100 && score > 0) {
                setColor("text-warning");
            } else {
                setColor("text-error");
            }
        }
    }, [score, text]);

    return (
        <>
            {!!text && (
                <motion.span
                    className={`fixed top-10 self-center text-success font-bold text-lg z-40 drop-shadow ${color}`}
                    animate={{
                        opacity: [0, 1, 1, 0],
                        y: [-100, 0, 0, -100],
                    }}
                    transition={{
                        duration: 1,
                        times: [0.0, 0.2, 0.9, 1],
                        ease: "backInOut",
                    }}
                >
                    {text}
                </motion.span>
            )}
        </>
    );
}
