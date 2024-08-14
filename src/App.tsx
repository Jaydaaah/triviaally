import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScreenManagerProvider from "./components/Screens/context/ScreenManagerProvider";
import Mainmenu from "./components/Screens/Home";
import PlayCategories from "./components/Screens/PlayCategories";
import Leaderboards from "./components/Screens/leaderboards";
import Profile from "./components/Screens/Profle";

import FooterNav from "./components/Screens/FooterNav";
import Quiz from "./components/QuizProvider";
import ThemeProvider from "./context/Theme/Provider/ThemeProvider";

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <Quiz>
                    <ScreenManagerProvider footer={<FooterNav />}>
                        <Mainmenu />
                        <Leaderboards />
                        <PlayCategories />
                        <Profile />
                    </ScreenManagerProvider>
                </Quiz>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
