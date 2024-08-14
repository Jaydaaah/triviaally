import { useContext } from "react";
import { LeaderboardContext } from "../LeaderboardContext";

export default function useOverallLeaderboard() {
    const context = useContext(LeaderboardContext);
    if (!context) {
        throw new Error("Can't find Leaderboard Context on the ancestral tree");
    }
    const {overAll} = context;

    return {overAll};
}