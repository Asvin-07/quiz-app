import { useEffect, useState } from "react";

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("theme") === "dark" ||
            (!localStorage.getItem("theme") &&
                window.matchMedia("(prefers-color-scheme: dark)").matches);
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    return (
        <button
            className="p-2 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white transition duration-300"
            onClick={() => setIsDark(!isDark)}
        >
            {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
    );
};

export default ThemeToggle;
