import {
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react";
import { QuizTimeCounterContext } from "../QuizTimeCounterContext";
import {MaxTime} from "../../../../../context/LeaderboardProvider/ScoreBaseLine.json";

const default_time = MaxTime + 1;

interface Props {
    children?: ReactNode | ReactNode[];
}

export default function QuizTimeProvider({ children }: Props) {
    const [timeAlive, setTimeAlive] = useState(false);
    const [counter, setCounter] = useState(default_time);

    useEffect(() => {
        let lastTimeEpochMs = Date.now();
        const timerInterval = setInterval(() => {
            const timeNowMs = Date.now();
            if (timeAlive) {
                const timeDiff = Math.round(
                    (timeNowMs - lastTimeEpochMs) / 1000
                );
                setCounter((prevCount) => {
                    return Math.max(prevCount - timeDiff, 0);
                });
            }
            lastTimeEpochMs = timeNowMs;
        }, 1000);

        return () => {
            clearInterval(timerInterval);
        };
    }, [timeAlive]);

    useEffect(() => {
        if (counter <= 0) {
            setTimeAlive(false);
        }
    }, [counter]);

    const startTime = useCallback((reset: boolean = true) => {
        if (reset) {
            setCounter(default_time);
        }
        setTimeout(() => {
            setTimeAlive(true);
        });
    }, []);

    return (
        <QuizTimeCounterContext.Provider value={{counter, startTime}}>
            {children}
        </QuizTimeCounterContext.Provider>
    );
}


