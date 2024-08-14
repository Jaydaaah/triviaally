import { useContext } from "react";
import { QuizTimeCounterContext } from "../QuizTimeCounterContext";


export function useQuizTimer() {
    const counterContext = useContext(QuizTimeCounterContext);

    if (counterContext == undefined) {
        throw new Error("Can't find QuizTimeProvider in the ancestral tree");
    }

    return counterContext;
}
