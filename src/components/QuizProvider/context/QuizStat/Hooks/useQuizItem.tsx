import { useContext } from "react";
import { QuizStatItemsContext } from "../QuizStatContext";




export function useQuizItem(quizIndex: number) {
    const items = useContext(QuizStatItemsContext);

    if (!items) {
        throw new Error("Can't locate QuizStatProvider parent in the tree");
    }

    return items[quizIndex];
}
