import { useContext } from "react";
import { QuizStatCurrentQuestionContext, QuizStatItemsContext } from "../QuizStatContext";




export function useQuizCurrent() {
    const currentQuestionContext = useContext(QuizStatCurrentQuestionContext);
    const items = useContext(QuizStatItemsContext);
    if (!currentQuestionContext || !items) {
        throw new Error("Can't locate QuizStatProvider parent in the tree");
    }

    return { ...currentQuestionContext, total_count: items.length };
}
