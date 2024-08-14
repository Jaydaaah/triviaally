import { useQuiz } from "../context/useQuiz";
import { useQuizCurrent } from "../context/QuizStat/Hooks/useQuizCurrent";
import QuizResult from "./QuizResult";
import QuizTime from "./QuizTime";
import useQuizConfig from "../context/QuizConfig/hooks/useQuizConfig";

// Icons
import { IoIosArrowBack } from "react-icons/io";

const colorMap: Record<string, string> = {
    easy: "progress-primary",
    medium: "progress-secondary",
    hard: "progress-accent",
};

export default function QuizProgress() {
    const { difficulty } = useQuizConfig();
    const { currentIndex, total_count } = useQuizCurrent();
    const { endGame } = useQuiz();

    const countm = Math.min(currentIndex + 1, total_count);

    return (
        <div className="flex flex-col max-w-96 md:max-w-5xl w-full self-center px-4">
            {currentIndex < total_count ? (
                <>
                    <div className="flex justify-between">
                        <button
                            className="text-neutral-content flex items-center cursor-pointer active:text-primary"
                            onClick={endGame}
                        >
                            <IoIosArrowBack />
                            <span>back</span>
                        </button>
                        <h2 className="m-4 font-semibold text-lg">
                            Quiz {countm} / {total_count}
                        </h2>
                        <QuizTime />
                    </div>

                    <progress
                        className={`progress ${colorMap[difficulty]} self-center mx-4`}
                        value={(countm / total_count) * 100}
                        max="100"
                    />
                </>
            ) : (
                <QuizResult />
            )}
        </div>
    );
}
