import { createContext } from "react";

export type Difficulty = "easy" | "medium" | "hard";

export const QuizOverlayContext = createContext<
    {
        playGame: (params: {
            category: string;
            difficulty: Difficulty;
        }) => void;
        endGame: () => void;
    } |
    undefined
>(undefined);
