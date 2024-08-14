import { MotionConfig, motion } from "framer-motion";
import { useMemo, useCallback, useEffect, useState } from "react";
import { useQuiz } from "../context/useQuiz";
import { useQuizProgressMaster } from "../context/QuizStat/Hooks/useQuizProgressMaster";
import { addDbScore } from "../../../db/UserScore";
import { useUserAccount } from "../../../context/UserAccount/Hooks/useUserAccount";
import useQuizConfig from "../context/QuizConfig/hooks/useQuizConfig";

const feedbackMap: Record<number, string> = {
    0: "That's a tough start. Looks like there's a lot to work on.",
    100: "Better luck next time. Keep practicing and you'll see improvement.",
    200: "You can do better. Review the material and give it another shot.",
    300: "Decent effort. You're on the right track but there's room for growth.",
    400: "Not bad. You're making progress, but keep pushing to improve.",
    500: "Good enough. A solid performance, but there's still potential for more.",
    600: "You're getting there. Your effort is showing; keep up the hard work.",
    700: "Solid performance. You're performing well and it's showing in your score.",
    800: "Nice work. You're doing well, but there's always room for a bit more effort.",
    900: "Pretty good. You've got a good handle on the material, but aim for even higher.",
    1000: "Well played. You're showing strong understanding; keep up the good work.",
    1100: "Impressive. You've grasped the concepts well, keep aiming higher.",
    1200: "Quite good. Your skills are evident; continue refining your techniques.",
    1300: "Strong showing. You're demonstrating great proficiency; keep it up.",
    1400: "Really good. You're excelling and your hard work is paying off.",
    1500: "Excellent job. Your performance is outstanding and shows a high level of skill.",
    1600: "Great job. You've performed exceptionally well and it shows in your score.",
    1700: "Outstanding effort. Your dedication and skill are clearly evident.",
    1800: "Very impressive. You've demonstrated a high level of expertise and effort.",
    1900: "Almost nailed it. You're just a step away from perfection; keep pushing.",
    2000: "Perfect score! You've achieved the highest possible result. Well done!",
};

function getFeedback(score: number): string {
    // Determine the closest lower bound of the score
    const lowerBound = Math.floor(score / 100) * 100;
    return feedbackMap[lowerBound] || "Score out of range.";
}

export default function QuizResult() {
    const { endGame } = useQuiz();
    const { quizProgress } = useQuizProgressMaster();
    const { category, difficulty } = useQuizConfig();
    const {username} = useUserAccount();

    const [scoreSaved, setScoreSaved] = useState(false);

    const sumOfScore = useMemo(() => {
        const scores = Object.values(quizProgress).map(
            (item) => item?.score ?? 0
        );
        const sum = scores.reduce((partialSum, score) => partialSum + score, 0);
        return sum;
    }, [quizProgress]);

    const continueBTN = useCallback(() => {
        endGame();
    }, [endGame]);

    useEffect(() => {
        if (!scoreSaved) {
            const timeout = setTimeout(
                async () => {
                    try {
                        if (username) {
                            await addDbScore(username.name, { category, difficulty, score: sumOfScore })
                        }
                    } finally {
                        setScoreSaved(true);
                    }
                }
            );
            return () => clearTimeout(timeout);
        }
    }, [scoreSaved, category, difficulty, sumOfScore, username]);

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <MotionConfig
                transition={{
                    ease: "backOut",
                    duration: 1,
                }}
            >
                <motion.div
                    className="flex flex-col"
                    initial={{
                        y: -100,
                        opacity: 0,
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                    }}
                >
                    <h1 className="text-7xl font-semibold self-center py-10">
                        Done!
                    </h1>
                    <div className="stats shadow self-center w-80 md:w-96 h-48">
                        <div className="stat">
                            <div className="stat-title text-2xl">
                                Your score
                            </div>
                            <div className="stat-value text-4xl">
                                {sumOfScore}
                            </div>
                            <p className="stat-desc text-xl text-wrap">
                                {getFeedback(sumOfScore)}
                            </p>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    className="flex-grow flex flex-col-reverse"
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                >
                    <button
                        className="btn my-14 md:w-96 md:self-center"
                        onClick={continueBTN}
                    >
                        continue
                    </button>
                </motion.div>
            </MotionConfig>
        </div>
    );
}
