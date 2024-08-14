import { useContext } from "react";
import { QuizConfigContext } from "../QuizConfigContext";

export default function useQuizConfig() {
    const quizConfigContext = useContext(QuizConfigContext);

    if (!quizConfigContext) {
        throw new Error("Can't find QuizConfigProvider in the ancestral tree");
    }

    const {difficulty} = quizConfigContext;
    if (difficulty != "easy" && difficulty != "medium" && difficulty != "hard") {
        throw new Error(`Invalid difficulty value: ${difficulty}`);
    }

    return quizConfigContext;
}
