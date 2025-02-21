import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Scoreboard from "./pages/Scoreboard";

function App() {
    const [isDark, setIsDark] = useState(
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    );

    // Apply dark mode globally
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    return (
      <div className={`min-h-screen flex flex-col items-center p-4 ${isDark ? "bg-black text-white" : "bg-white text-black"} transition-all duration-300`}>
            {/* Header Section */}
            <div className="w-full max-w-3xl flex justify-between items-center p-4">
                <h1 className="text-3xl font-bold text-center flex-1">Quiz Whizz 🎉</h1>
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="bg-gray-800 dark:bg-gray-300 text-white dark:text-black px-4 py-2 rounded-lg shadow hover:bg-gray-700 dark:hover:bg-gray-400"
                >
                    {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>
            </div>

            {/* Main Content Container - FIXED */}
            <div className={`w-full max-w-3xl ${isDark ? "bg-black text-white" : "bg-white text-black"} rounded-2xl p-8 shadow-lg flex flex-col items-center transition-all duration-300`}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/quiz" element={<Quiz />} />
                        <Route path="/scoreboard" element={<Scoreboard />} />
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;
