import { createContext } from "react";

export interface Leaderboard {
    name: string;
    category: string;
    difficulty: string | "easy" | "medium" | "hard";
    score: number;
}

export const LeaderboardContext = createContext<
    | {
          overAll: Leaderboard[];
          getScores: (params: {
              name?: string;
              category?: string;
              difficulty?: "easy" | "medium" | "hard";
          }) => Promise<Leaderboard[]>;
      }
    | undefined
>(undefined);
