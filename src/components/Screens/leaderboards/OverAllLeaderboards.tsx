import { } from "react"
import useOverallLeaderboard from "../../../context/LeaderboardProvider/Hooks/useOverallLeaderboard"
import LeaderCard from "./LeaderCard";

export default function OverAllLeaderboards() {

    const {overAll} = useOverallLeaderboard();

    return (
        <div className="grid grid-cols-3 mt-16 m-10 items-end">
            {overAll.length > 1 && <LeaderCard name={overAll[1].name} score={overAll[1].score} rank="2nd"/>}
            {overAll.length > 0 && <LeaderCard name={overAll[0].name} score={overAll[0].score} rank="1st"/>}
            {overAll.length > 2 && <LeaderCard name={overAll[2].name} score={overAll[2].score} rank="3rd"/>}
        </div>
    )
}
