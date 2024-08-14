import { BiLockAlt } from "react-icons/bi";
import { RefObject, useCallback, useEffect, useState } from "react";
import { addLastPlay } from "../../../db/UserLastPlay";
import { useQuiz } from "../../QuizProvider/context/useQuiz";
import { useUserAccount } from "../../../context/UserAccount/Hooks/useUserAccount";
import useGetLeaderboard from "../../../context/LeaderboardProvider/Hooks/useGetLeaderboard";
import { Score_Baseline } from "../../../context/LeaderboardProvider/ScoreBaseLine.json";

interface Props {
    dialogRef: RefObject<HTMLDialogElement>;
    category: string;
}

export default function DifficultyModal({ category, dialogRef }: Props) {
    const [mediumScore, setMedScore] = useState(0);
    const [hardScore, setHardScore] = useState(0);

    const { getScores } = useGetLeaderboard();
    const { username } = useUserAccount();
    const { playGame } = useQuiz();

    const play = useCallback(
        (difficulty: "easy" | "medium" | "hard") => {
            return () => {
                if (username) {
                    addLastPlay({ name: username.name, category });
                }
                playGame({
                    category,
                    difficulty,
                });
            };
        },
        [playGame, category, username]
    );

    useEffect(() => {
        if (username) {
            const timeout = setTimeout(async () => {
                const user_data = await getScores({
                    name: username.name,
                    category,
                }).then((data) =>
                    data.filter(({ name }) => name == username.name)
                );
                if (user_data.length > 0) {
                    const { score } = user_data[0];
                    setMedScore(score - Score_Baseline.medium);
                    setHardScore(score - Score_Baseline.hard);
                }
            });

            return () => clearTimeout(timeout);
        }
    }, [username, category, getScores]);

    return (
        <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Select Category</h3>
                <p className="text-neutral-500">
                    {hardScore <= 0 &&
                        `You need more ${
                            mediumScore <= 0
                                ? `${-mediumScore} scores to unlock medium`
                                : `${-hardScore} points to unlock hard`
                        }`}
                </p>

                <div className="modal-action">
                    <div className="join join-horizontal">
                        <button
                            className="btn join-item bg-primary active:bg-neutral-content"
                            onClick={play("easy")}
                        >
                            Easy
                        </button>
                        <button
                            disabled={mediumScore <= 0}
                            className="btn join-item bg-secondary active:bg-neutral-content"
                            onClick={play("medium")}
                        >
                            <span className="flex">
                                Medium
                                {mediumScore <= 0 && <BiLockAlt />}
                            </span>
                        </button>
                        <button
                            className="btn join-item bg-accent active:bg-neutral-content"
                            disabled={hardScore <= 0}
                            onClick={play("hard")}
                        >
                            <span className="flex">
                                Hard
                                {hardScore <= 0 && <BiLockAlt />}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}
