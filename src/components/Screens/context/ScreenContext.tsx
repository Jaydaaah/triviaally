import { createContext } from "react";

export const ScreenContext = createContext<
    | {
          screen: number;
          setScreen: (index: number) => void;
      }
    | undefined
>(undefined);
