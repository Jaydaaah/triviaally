import { useEffect, useMemo, useState } from "react";
import QuizChoice from "./Choice";
import { useQuizCurrent } from "../context/QuizStat/Hooks/useQuizCurrent";
import { useQuizProgress } from "../context/QuizStat/Hooks/useQuizProgress";
import { useQuizItem } from "../context/QuizStat/Hooks/useQuizItem";
import { motion } from "framer-motion";
import { useQuizTimer } from "../context/QuizTimeProvider/hooks/useQuizTimer";
import ScorePopUp from "./ScorePopUp";
import { Multiplier } from "../../../context/LeaderboardProvider/ScoreBaseLine.json";
import useQuizConfig from "../context/QuizConfig/hooks/useQuizConfig";

function decodeHtmlEntities(text: string) {
    const txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
}

interface Props {
    quizIndex: number;
}

export default function Question({ quizIndex }: Props) {
    const { counter, startTime } = useQuizTimer();
    const { question, choices, correct_answer } = useQuizItem(quizIndex);
    const { setQuestionAns } = useQuizProgress({ question });
    const { currentIndex } = useQuizCurrent();
    const [selected, setSelected] = useState("");
    const [score, setScore] = useState<number>(0);

    const { difficulty } = useQuizConfig();

    const scoreMultiplier = useMemo(() => {
        switch (difficulty) {
            case "medium":
                return Multiplier.medium;
            case "hard":
                return Multiplier.hard;
            default:
                return Multiplier.easy;
        }
    }, [difficulty]);

    useEffect(() => {
        startTime();
    }, [startTime]);

    useEffect(() => {
        const timeout = setTimeout(
            (counter: number) => {
                if (selected) {
                    const score = selected == correct_answer ? counter * scoreMultiplier : 0;
                    setQuestionAns(selected, score);
                    setScore(score);
                }
            },
            0,
            [counter]
        );

        return () => {
            clearTimeout(timeout);
        };
    }, [selected, correct_answer, counter, setQuestionAns, scoreMultiplier]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (counter <= 0 && !selected && currentIndex == quizIndex) {
                setSelected("No Answerrrr");
                setScore(0);
            }
        });
        return () => {
            clearTimeout(timeout);
        };
    }, [counter, selected, currentIndex, quizIndex]);

    return (
        <>
            <motion.div
                className="card-body items-center justify-center"
                initial={{
                    x: 5000,
                    opacity: 0.5,
                }}
                animate={{
                    x: 0,
                    opacity: 1,
                }}
                exit={{
                    x: -5000,
                    opacity: 0,
                }}
            >
                <h2 className="card-title text-4xl text-center select-none">
                    {decodeHtmlEntities(question)}
                </h2>
                <ScorePopUp score={score} />
            </motion.div>
            <motion.div
                className="grid grid-cols-2 gap-3 h-[30%] my-10"
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                exit={{
                    opacity: 0,
                }}
            >
                {choices.map((choice) => (
                    <QuizChoice
                        className="text-opacity-50 bg-neutral text-neutral-content bg-opacity-40 font-semibold"
                        key={choice}
                        selectedState={{ selected, setSelected }}
                        correct={correct_answer}
                    >
                        {choice}
                    </QuizChoice>
                ))}
            </motion.div>
        </>
    );
}
