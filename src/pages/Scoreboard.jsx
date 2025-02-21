import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getQuizHistory, clearQuizHistory } from "../db"; // Import clearQuizHistory function

const Scoreboard = () => {
    const [quizHistory, setQuizHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const history = await getQuizHistory();
            // Sort scores in descending order (highest first)
            const sortedHistory = history.sort((a, b) => b.score - a.score);
            setQuizHistory(sortedHistory);
        };

        fetchHistory();
    }, []);

    // Function to handle resetting the score
    const handleResetScore = async () => {
        await clearQuizHistory(); // Clear the IndexedDB history
        setQuizHistory([]); // Reset state to reflect the change
        console.log("🔄 Scoreboard reset!");
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white dark:bg-black rounded-lg shadow-md text-black dark:text-white text-center">
            <h2 className="text-3xl font-bold mb-4">🏆 Scoreboard</h2>

            {quizHistory.length === 0 ? (
                <p className="text-lg text-gray-500 dark:text-gray-400">
                    No quiz attempts yet. Play a quiz to see your score here!
                </p>
            ) : (
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="p-3 border">Rank</th>
                            <th className="p-3 border">Score</th>
                            <th className="p-3 border">Total</th>
                            <th className="p-3 border">Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizHistory.map((attempt, index) => (
                            <tr key={index} className="border">
                                <td className="p-3 border font-bold">
                                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                                </td>
                                <td className="p-3 border">{attempt.score}</td>
                                <td className="p-3 border">{attempt.totalQuestions}</td>
                                <td className="p-3 border text-sm text-gray-500 dark:text-gray-400">
                                    {attempt.timestamp}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div className="flex flex-col gap-3 mt-6">
                {/* Reset Score Button */}
                <button
                    onClick={handleResetScore}
                    className="w-full p-3 rounded-md font-semibold transition-all 
                    bg-red-500 text-white hover:bg-red-600 
                    dark:bg-red-700 dark:hover:bg-red-800"
                >
                    🔄 Reset Score
                </button>

                {/* Back to Home Button */}
                <Link to="/">
                    <button className="w-full p-3 rounded-md font-semibold transition-all 
                    bg-gray-800 dark:bg-gray-200 text-white dark:text-black 
                    hover:bg-gray-900 dark:hover:bg-gray-300">
                        🏠 Back to Home
                    </button>
                </Link>

                {/* Play Again Button */}
                <Link to="/quiz">
                    <button className="w-full p-3 rounded-md font-semibold transition-all 
                    bg-gray-800 dark:bg-gray-200 text-white dark:text-black 
                    hover:bg-gray-900 dark:hover:bg-gray-300">
                        🎮 Play Again
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Scoreboard;
