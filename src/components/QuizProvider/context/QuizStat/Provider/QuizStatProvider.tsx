import { ReactNode, useEffect, useState } from "react";
import { IQuizProgress, QuizStatCurrentQuestionContext, QuizStatItemsContext, QuizStatProgressContext } from "../QuizStatContext";

interface Props {
    children?: ReactNode;
    items: {
        question: string;
        choices: string[];
        correct_answer: string;
    }[];
}
export default function QuizStatProvider({ children, items }: Props) {
    const [quizProgress, setProgress] = useState<IQuizProgress>({});
    const [currentIndex, setCurrent] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const progressCount = Object.keys(quizProgress).length;
            setCurrent(progressCount);
        }, 500);
        
        return () => {
            clearTimeout(timeout);
        };
    }, [quizProgress]);


    return (
        <QuizStatItemsContext.Provider value={items}>
            <QuizStatProgressContext.Provider value={{ quizProgress, setProgress }}>
                <QuizStatCurrentQuestionContext.Provider value={{currentIndex, setCurrent}}>
                    {children}
                </QuizStatCurrentQuestionContext.Provider>
            </QuizStatProgressContext.Provider>
        </QuizStatItemsContext.Provider>
    );
}