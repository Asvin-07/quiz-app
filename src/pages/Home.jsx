import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
            <div className="w-full max-w-lg bg-white dark:bg-black shadow-lg rounded-2xl p-8 text-center">
                <h1 className="text-3xl font-bold mb-2">Welcome 😊</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Test your knowledge and have fun!</p>

                <Link to="/quiz">
                    <button className="w-full bg-gray-800 dark:bg-gray-200 text-white dark:text-black px-6 py-3 rounded-lg mb-3 flex items-center justify-center">
                        🚀 Start Quiz
                    </button>
                </Link>

                <Link to="/scoreboard">
                    <button className="w-full bg-gray-800 dark:bg-gray-200 text-white dark:text-black px-6 py-3 rounded-lg flex items-center justify-center">
                        📊 View Scoreboard
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
