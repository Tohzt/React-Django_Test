import { createContext, useContext, useState, useEffect } from "react";

const THEME_KEY = "gameu-theme";

const ThemeContext = createContext();

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

function getSystemTheme() {
	if (
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	) {
		return "dark";
	}
	return "light";
}

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(() => {
		// Get theme from localStorage or system preference
		const savedTheme = localStorage.getItem(THEME_KEY);
		const systemTheme = getSystemTheme();
		const initialTheme = savedTheme || systemTheme;

		// Apply theme immediately to prevent flash
		document.documentElement.setAttribute("data-theme", initialTheme);

		return initialTheme;
	});

	useEffect(() => {
		// Apply theme to document and save to localStorage
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem(THEME_KEY, theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
	};

	const value = {
		theme,
		setTheme,
		toggleTheme,
		isDark: theme === "dark",
	};

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};
