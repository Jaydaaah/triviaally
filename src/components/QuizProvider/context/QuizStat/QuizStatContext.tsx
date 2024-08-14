import {
    createContext,
    Dispatch,
    SetStateAction,
} from "react";

export const QuizStatItemsContext = createContext<
    | {
          question: string;
          choices: string[];
          correct_answer: string;
      }[]
    | undefined
>(undefined);

export type IQuizProgress = Record<
    string,
    {
        answer: string;
        score: number;
    } | undefined
>;

export const QuizStatProgressContext = createContext<
    | {
          quizProgress: IQuizProgress;
          setProgress: Dispatch<SetStateAction<IQuizProgress>>;
      }
    | undefined
>(undefined);

export const QuizStatCurrentQuestionContext = createContext<
    | { currentIndex: number; setCurrent: Dispatch<SetStateAction<number>> }
    | undefined
>(undefined);

