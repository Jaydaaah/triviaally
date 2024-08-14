import { createContext } from "react";

export interface QuizConfig {
    amount: number;
    category: string;
    difficulty: string | "easy" | "medium" | "hard";
    gameId: string;
    type: "multiple" | "boolean";
}

export const QuizConfigContext = createContext<QuizConfig | undefined>(undefined);
