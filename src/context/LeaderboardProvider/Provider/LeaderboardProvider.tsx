import { ReactNode, useCallback, useEffect, useState } from "react";
import { Leaderboard, LeaderboardContext } from "../LeaderboardContext";
import { getDbScores } from "../../../db/UserScore";

interface props {
    children: ReactNode;
}

export default function LeaderboardProvider({ children }: props) {
    const [overAll, setOverAll] = useState<Leaderboard[]>([]);

    const getScores = useCallback(
        async (filter: {
            name?: string;
            category?: string;
            difficulty?: "easy" | "medium" | "hard";
        }) => {
            const map_leaderboards = new Map<string, Leaderboard>();
            const category_scoreboard = await getDbScores({ ...filter });

            if (category_scoreboard) {
                for (const {
                    name,
                    category,
                    difficulty,
                    score,
                } of category_scoreboard) {
                    const keys: string[] = [name, filter.category, filter.difficulty].filter((value) => value != undefined);
                    const key = keys.join("|");

                    if (map_leaderboards.has(key)) {
                        const existing = map_leaderboards.get(key)!;
                        existing.score += score;
                    } else {
                        map_leaderboards.set(key, {
                            name,
                            category,
                            difficulty,
                            score,
                        });
                    }
                }
            }

            return Array.from(map_leaderboards.values()).sort(
                (a, b) => b.score - a.score // Sort by score in descending order
            );
        },
        []
    );

    useEffect(() => {
        getScores({}).then((value) => {
            setOverAll(value);
        });
    }, [getScores]);

    return (
        <LeaderboardContext.Provider value={{ overAll, getScores }}>
            {children}
        </LeaderboardContext.Provider>
    );
}
