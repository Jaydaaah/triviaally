import { CSSProperties } from "react";
import { useQuizTimer } from "../context/QuizTimeProvider/hooks/useQuizTimer";

const warn_time = 10;

export default function QuizTime() {
    const {counter} = useQuizTimer();

    // Define the style object with --value
    const countdownStyle = {
        "--value": Math.max(counter - 1, 0),
    } as CSSProperties;

    return (
        <span className={`self-center countdown m-2 ${counter <= warn_time && "text-error font-bold"}`}>
            <span style={countdownStyle}></span>
        </span>
    );
}
