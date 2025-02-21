import { openDB } from 'idb';

// Initialize the IndexedDB database
const dbPromise = openDB('quizWhizzDB', 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('quizHistory')) {
            db.createObjectStore('quizHistory', { keyPath: 'id', autoIncrement: true });
        }
    },
});

// Function to save a quiz attempt
export const saveQuizAttempt = async (score, totalQuestions) => {
    try {
        const db = await dbPromise;
        const timestamp = new Date().toLocaleString();
        await db.add('quizHistory', { score, totalQuestions, timestamp });
        console.log("✅ Quiz attempt saved successfully!");
    } catch (error) {
        console.error("❌ Error saving quiz attempt:", error);
    }
};

// Function to retrieve all quiz history
export const getQuizHistory = async () => {
    try {
        const db = await dbPromise;
        const history = await db.getAll('quizHistory');
        return history || []; // Return empty array if no history
    } catch (error) {
        console.error("❌ Error fetching quiz history:", error);
        return [];
    }
};

// Function to clear quiz history (Optional)
export const clearQuizHistory = async () => {
    try {
        const db = await dbPromise;
        await db.clear('quizHistory');
        console.log("🗑️ Quiz history cleared!");
    } catch (error) {
        console.error("❌ Error clearing quiz history:", error);
    }
};
