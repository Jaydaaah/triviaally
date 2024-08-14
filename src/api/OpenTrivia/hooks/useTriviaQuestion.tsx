import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Categories } from "../OpenTrivia.info.json";
import { useMemo } from "react";
import {
    QuizConfig,
} from "../../../components/QuizProvider/context/QuizConfig/QuizConfigContext";
import useQuizConfig from "../../../components/QuizProvider/context/QuizConfig/hooks/useQuizConfig";

interface getMultipleRequestInterface {
    response_code: number;
    results: {
        type: string;
        difficulty: string;
        category: string;
        question: string;
        correct_answer: string;
        incorrect_answers: string[];
    }[];
}

export function getCategoryId(category: string) {
    const found = Categories.find((cat) => cat.name == category);
    if (found) {
        return found.id;
    }
    return null;
}

async function fetchMultipleTrivia(
    category: number,
    { difficulty, amount = 10, type = "multiple" }: QuizConfig
) {
    //return temp_data;
    const response = await axios.get<getMultipleRequestInterface>(
        "https://opentdb.com/api.php",
        {
            params: {
                type,
                category,
                difficulty,
                amount,
            },
        }
    );
    return response.data;
}

export default function useTriviaQuestion() {
    const config = useQuizConfig();

    const category = useMemo(() => {
        return getCategoryId(config.category);
    }, [config]);

    if (!category) {
        throw new Error("Invalid Category Name");
    }

    const query = useQuery({
        queryKey: ["trivias", config.gameId],
        queryFn: () => {
            return fetchMultipleTrivia(category, config);
        },
        staleTime: 60 * 1000 * 10,
        refetchOnWindowFocus: false,
        enabled: !!config.gameId,
    });

    return query;
}
