import { useContext, useCallback } from "react";
import { QuizStatItemsContext, QuizStatProgressContext } from "../QuizStatContext";




export function useQuizProgress(params: { question: string; }) {
    const items = useContext(QuizStatItemsContext);
    const progressContext = useContext(QuizStatProgressContext);

    if (!progressContext || !items) {
        throw new Error("Can't locate QuizStatProvider parent in the tree");
    }

    const { quizProgress, setProgress } = progressContext;

    const setQuestionAns = useCallback(
        (answer: string, score: number) => {
            const item = items.find(({ question }) => params.question == question);
            if (item) {
                setProgress((prev) => {
                    if (!prev[params.question]) {
                        prev[params.question] = { answer, score };
                        return { ...prev };
                    }
                    return prev;
                });
            } else {
                throw new Error(
                    `setQuestionAns Error: Can't find Question: "${params.question}"`
                );
            }
        },
        [items, setProgress, params.question]
    );

    return { quizStat: quizProgress[params.question], setQuestionAns };
}
