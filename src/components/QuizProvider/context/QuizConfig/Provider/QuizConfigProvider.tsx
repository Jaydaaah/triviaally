import { ReactNode } from "react";
import { QuizConfigContext } from "../QuizConfigContext";

interface Props {
    children?: ReactNode;
    config: {
        amount?: number;
        type?: "multiple" | "boolean";
        category: string;
        difficulty: string | "easy" | "medium" | "hard";
        gameId: string;
    };
}


export default function QuizConfigProvider({ children, config }: Props) {
    const {category, difficulty, gameId} = config;
    let {amount, type} = config;
    amount ??= 10;
    type ??= "multiple";

    if (!category || !difficulty || !gameId) {
        throw new Error(
            `Invalid configuration. category: ${category}, difficulty: ${difficulty}, gameId: ${gameId}`
        );
    }

    return (
        <QuizConfigContext.Provider
            value={{
                amount,
                type,
                category,
                difficulty,
                gameId,
            }}
        >
            {children}
        </QuizConfigContext.Provider>
    );
}