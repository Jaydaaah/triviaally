import { createContext } from "react";


export const QuizTimeCounterContext = createContext<{
    counter: number;
    startTime: (reset?: boolean) => void;
} | undefined>(undefined);
