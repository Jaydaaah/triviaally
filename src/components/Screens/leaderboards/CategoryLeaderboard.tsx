import { FaCrown } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useGetLeaderboard from "../../../context/LeaderboardProvider/Hooks/useGetLeaderboard";
import { Leaderboard } from "../../../context/LeaderboardProvider/LeaderboardContext";

interface props {
    children: string;
}

export default function CategoryLeaderboard({ children }: props) {
    const [ladder, setLadder] = useState<Leaderboard[]>([]);

    const { getScores } = useGetLeaderboard();

    useEffect(() => {
        const timeout = setTimeout(() => {
            getScores({ category: children }).then((datas) => {
                setLadder(datas);
            });
        });

        return () => clearTimeout(timeout);
    }, [getScores, children]);

    return (
        <>
            {ladder.length > 0 && (
                <motion.div
                    className="rounded-3xl mt-8 mx-4 p-4 shadow bg-neutral text-neutral-content flex flex-col"
                    animate={{
                        y: [200, 0],
                    }}
                >
                    <ul className="flex-grow join join-vertical">
                        {ladder.map(({ name, score }, index) => (
                            <li className="flex items-center gap-2" key={name}>
                                <span className="text-xl w-4">{index + 1}</span>
                                <div className="flex-grow flex justify-between items-center px-2">
                                    <p className="join-item text-2xl font-semibold flex gap-3 items-center">
                                        {name}
                                        {index <= 0 && score != 0 && (
                                            <FaCrown className="text-xl text-rank-legend" />
                                        )}
                                    </p>
                                    <p className="join-item text-xl">{score}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </>
    );
}
