import ScreenTemplate from "../ScreenTemplate";
import { Categories } from "../../../api/OpenTrivia/OpenTrivia.info.json";
import ScreenManagerProvider from "../context/ScreenManagerProvider";
import { useMemo } from "react";
import OverAllLeaderboards from "./OverAllLeaderboards";
import CategorySelector from "./CategorySelector";
import CategoryLeaderboard from "./CategoryLeaderboard";

export default function Leaderboards() {
    const CategoryNames = useMemo(() => {
        return Categories.map(({ name }) => name);
    }, []);

    return (
        <ScreenTemplate title="Leaderboards">
            <div className="hero">
                <OverAllLeaderboards />
            </div>
            <ScreenManagerProvider
                hasExtraGap={false}
                header={<CategorySelector>{CategoryNames}</CategorySelector>}
            >
                {Categories.map(({ name }) => (
                    <CategoryLeaderboard key={name}>{name}</CategoryLeaderboard>
                ))}
            </ScreenManagerProvider>
        </ScreenTemplate>
    );
}
