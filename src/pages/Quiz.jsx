import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import quizData from "../quizData";
import { saveQuizAttempt } from "../db";


const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [integerAnswer, setIntegerAnswer] = useState("");
    const [timeLeft, setTimeLeft] = useState(30);

    const totalQuestions = quizData.length;
    const currentQuiz = quizData[currentQuestion];

    // Timer Effect
    useEffect(() => {
        if (timeLeft === 0) {
            handleNextQuestion();
            return;
        }
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);

    const handleNextQuestion = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion((prev) => prev + 1);
            setSelectedAnswer(null);
            setFeedback("");
            setIntegerAnswer("");
            setTimeLeft(30);
        } else {
            setQuizCompleted(true);
        }
    };

    const handleAnswerClick = (option) => {
        setSelectedAnswer(option);
        // Dynamically create an audio object
        const sound = new Audio(
            option === currentQuiz.correctAnswer
                ? "/sounds/correct.mp3"
                : "/sounds/incorrect.mp3"
        );
        sound.play();  // Play the sound

        if (option === currentQuiz.correctAnswer) {
            setFeedback("✅ Correct!");
            setScore((prevScore) => prevScore + 1);
        } else {
            setFeedback("❌ Incorrect!");
        }
        setTimeout(handleNextQuestion, 1500);
    };

    const handleIntegerSubmit = () => {
    if (integerAnswer.trim() === "") return; // Prevent empty input submission

    const userAnswer = Number(integerAnswer);
    const isCorrect = userAnswer === currentQuiz.correctAnswer;

    // Play correct or incorrect sound
    const sound = new Audio(isCorrect ? "/sounds/correct.mp3" : "/sounds/incorrect.mp3");
    sound.play();

    setFeedback(isCorrect ? "✅ Correct!" : "❌ Incorrect!");
    if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
    }

    setTimeout(handleNextQuestion, 1500);
};


    // Save score when quiz completes
    useEffect(() => {
        if (quizCompleted) {
            saveQuizAttempt(score, totalQuestions);
        }
    }, [quizCompleted]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="max-w-xl mx-auto p-6 bg-white dark:bg-black rounded-lg shadow-md text-black dark:text-white text-center"
        >
            {!quizCompleted ? (
                <>
                    {/* Progress Bar with Question X / Y */}
                    <div className="mb-4 text-lg font-semibold">
                        Question {currentQuestion + 1} / {totalQuestions}
                    </div>
                    <div className="relative w-full bg-gray-300 rounded-full h-3 mb-3">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                            transition={{ duration: 0.5 }}
                            className="absolute top-0 left-0 h-3 bg-blue-500 rounded-full"
                        />
                    </div>

                    {/* Timer */}
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mb-3 text-lg font-semibold text-red-500"
                    >
                        ⏳ Time Left: {timeLeft} sec
                    </motion.div>

                    {/* Animated Question */}
                    <motion.h2
                        key={currentQuestion}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.4 }}
                        className="text-2xl font-bold mb-4"
                    >
                        {currentQuiz.question}
                    </motion.h2>

                    {/* Multiple-Choice Questions */}
                    {currentQuiz.type === "multiple-choice" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-2"
                        >
                            {currentQuiz.options.map((option, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-full p-3 rounded-md border transition-all duration-300 ${selectedAnswer === option
                                        ? option === currentQuiz.correctAnswer
                                            ? "bg-green-500 text-white"
                                            : "bg-red-500 text-white"
                                        : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                                        }`}
                                    onClick={() => handleAnswerClick(option)}
                                    disabled={selectedAnswer !== null}
                                >
                                    {option}
                                </motion.button>
                            ))}
                        </motion.div>
                    )}

                    {/* Integer-Type Questions */}
                    {currentQuiz.type === "integer" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                            <input
                                type="number"
                                value={integerAnswer}
                                onChange={(e) => setIntegerAnswer(e.target.value)}
                                className="w-full p-2 rounded-md border bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                                placeholder="Enter your answer"
                                disabled={feedback !== ""}
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleIntegerSubmit}
                                className="mt-4 p-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                                disabled={feedback !== ""}
                            >
                                Submit Answer
                            </motion.button>
                        </motion.div>
                    )}

                    {feedback && <motion.p className="mt-4 text-lg font-semibold">{feedback}</motion.p>}
                </>
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <h2 className="text-3xl font-bold mb-4">🎉 Quiz Completed!</h2>
                    <p className="text-lg">Your Score: {score} / {totalQuestions}</p>

                    <motion.div className="flex flex-col gap-3 mt-6">
                        {/* Restart Quiz Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full p-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                            onClick={() => {
                                setCurrentQuestion(0);
                                setSelectedAnswer(null);
                                setFeedback("");
                                setScore(0);
                                setQuizCompleted(false);
                                setIntegerAnswer("");
                                setTimeLeft(30);
                            }}
                        >
                            🔄 Restart Quiz
                        </motion.button>

                        {/* View Scoreboard Button */}
                        <Link to="/scoreboard">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full p-3 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold"
                            >
                                📊 View Scoreboard
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Quiz;
