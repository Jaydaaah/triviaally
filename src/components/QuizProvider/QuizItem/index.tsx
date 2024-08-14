import { AnimatePresence, MotionConfig } from "framer-motion";
import { useQuizCurrent } from "../context/QuizStat/Hooks/useQuizCurrent";
import Question from "./Question";

interface Props {
    quizIndex: number;
}

export default function QuizItem({ quizIndex }: Props) {
    const { currentIndex } = useQuizCurrent();
    return (
        <AnimatePresence>
            {currentIndex == quizIndex && (
                <MotionConfig
                    transition={{
                        duration: 1,
                        ease: "anticipate",
                    }}
                >
                    <div className="card max-w-96 md:max-w-7xl h-[70%] w-full self-center absolute">
                        <Question quizIndex={quizIndex}/>
                    </div>
                </MotionConfig>
            )}
        </AnimatePresence>
    );
}
