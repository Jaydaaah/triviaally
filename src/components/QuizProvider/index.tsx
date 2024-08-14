import {
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react";
import QuizStage from "./QuizStage";
import { useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import QuizConfigProvider from "./context/QuizConfig/Provider/QuizConfigProvider";
import { Difficulty, QuizOverlayContext } from "./context/QuizOverlayContext";

interface props {
    children: ReactNode;
}

export default function QuizProvider({ children }: props) {
    const queryClient = useQueryClient();
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState<Difficulty>("easy");
    const [gameId, setGameId] = useState<string | null>(null);

    const playGame = useCallback(
        ({
            category,
            difficulty,
        }: {
            category: string;
            difficulty: Difficulty;
        }) => {
            setGameId(uuidv4());
            setDifficulty(difficulty);
            setCategory(category);
        },
        []
    );

    const endGame = useCallback(() => {
        setGameId(null);
        queryClient.removeQueries({ queryKey: ["trivia"], exact: true });
    }, [queryClient]);

    useEffect(() => {
        if (!gameId) {
            setDifficulty("easy");
            setCategory("");
        }
    }, [gameId]);

    return (
        <QuizOverlayContext.Provider value={{ playGame, endGame }}>
            <>
                {gameId ? (
                    <QuizConfigProvider
                        config={{ category, gameId, difficulty }}
                    >
                        <QuizStage key={gameId} />
                    </QuizConfigProvider>
                ) : (
                    children
                )}
            </>
        </QuizOverlayContext.Provider>
    );
}