import { useTheme } from "../../context/ThemeContext";

export default function DarkModeToggle() {
	const { theme, toggleTheme, isDark } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
			style={{
				background: "none",
				border: "none",
				cursor: "pointer",
				fontSize: "1.5rem",
				color: "var(--primary-500)",
				padding: "0.25rem 0.5rem",
				borderRadius: "var(--radius-lg)",
				transition: "background var(--transition-base)",
			}}
			title={isDark ? "Switch to light mode" : "Switch to dark mode"}
		>
			{isDark ? (
				<span role="img" aria-label="Switch to light mode">
					🌙
				</span>
			) : (
				<span role="img" aria-label="Switch to dark mode">
					🌞
				</span>
			)}
		</button>
	);
}
