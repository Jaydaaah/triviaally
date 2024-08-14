import { useCallback, useMemo } from "react";
import useTriviaQuestion from "../../api/OpenTrivia/hooks/useTriviaQuestion";
import QuizProgress from "./QuizProgress";
import QuizTimeProvider from "./context/QuizTimeProvider/provider/QuizTimeProvider";
import QuizItem from "./QuizItem";
import { useQuiz } from "./context/useQuiz";
import QuizStatProvider from "./context/QuizStat/Provider/QuizStatProvider";

function SomethingHappen({ text }: { text: string }) {
    const { endGame } = useQuiz();

    return (
        <div className="self-center h-screen flex items-center">
            <div className="flex flex-col gap-5">
                <span className="text-lg font-bold">{text}</span>
                <button className="btn btn-accent" onClick={endGame}>
                    Go Back
                </button>
            </div>
        </div>
    );
}

export default function QuizStage() {
    const { status, data } = useTriviaQuestion();

    const randomizeChoices = useCallback(
        (incorrect_answers: string[], correct_answer: string) => {
            return [...incorrect_answers, correct_answer].sort(
                () => Math.random() - 0.5
            );
        },
        []
    );

    const items = useMemo(() => {
        return (
            data?.results.map(
                ({ question, correct_answer, incorrect_answers }) => {
                    return {
                        question,
                        correct_answer,
                        choices: randomizeChoices(
                            incorrect_answers,
                            correct_answer
                        ),
                    };
                }
            ) ?? []
        );
    }, [data, randomizeChoices]);

    if (status == "success") {
        return (
            <div className="w-screen h-screen z-20 overflow-hidden fixed top-0 left-0 flex flex-col">
                {data && data?.response_code == 0 ? (
                    <QuizStatProvider items={items}>
                        <QuizTimeProvider>
                            <QuizProgress />
                            <div className="flex flex-col">
                                {items.map((item, index) => (
                                    <QuizItem
                                        key={`${index}-${item.question}`}
                                        quizIndex={index}
                                    />
                                ))}
                            </div>
                        </QuizTimeProvider>
                    </QuizStatProvider>
                ) : (
                    <SomethingHappen text="Sorry🥺, No Content Found" />
                )}
            </div>
        );
    } else if (status == "pending") {
        return (
            <div className="self-center h-screen flex items-center">
                <div className="flex flex-col gap-5">
                    <span className="loading loading-spinner loading-lg text-primary scale-150"></span>
                </div>
            </div>
        );
    } else {
        return <SomethingHappen text="Something wen't wrong" />;
    }
}
