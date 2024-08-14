import { useContext } from "react";
import { QuizStatItemsContext, QuizStatProgressContext } from "../QuizStatContext";




export function useQuizProgressMaster() {
    const items = useContext(QuizStatItemsContext);
    const progressContext = useContext(QuizStatProgressContext);

    if (!progressContext || !items) {
        throw new Error("Can't locate QuizStatProvider parent in the tree");
    }

    return { items, ...progressContext };
}
