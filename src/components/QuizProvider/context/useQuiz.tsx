import { useContext } from "react";
import { QuizOverlayContext } from "./QuizOverlayContext";


export function useQuiz() {
    const quizOverlayContext = useContext(QuizOverlayContext);

    if (!quizOverlayContext) {
        throw new Error("Can't find Quiz Provider in the Parent tree");
    }

    return quizOverlayContext;
}
