import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// Stylesheets
import "./index.tw.css";
import UserAccountProvider from "./context/UserAccount/Provider/UserAccountProvider.tsx";
import LeaderboardProvider from "./context/LeaderboardProvider/Provider/LeaderboardProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <UserAccountProvider>
            <LeaderboardProvider>
                <App />
            </LeaderboardProvider>
        </UserAccountProvider>
    </React.StrictMode>
);
