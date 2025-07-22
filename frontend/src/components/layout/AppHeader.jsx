import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui";
import { APP_CONFIG } from "../../utils/constants";
import "./AppHeader.css";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

function AppHeader() {
	const { user, logout } = useAuth();
	const location = useLocation();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);
	const { toggleTheme, isDark } = useTheme();

	// Close dropdown on outside click
	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDropdownOpen(false);
			}
		}
		if (dropdownOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			return () =>
				document.removeEventListener("mousedown", handleClickOutside);
		}
	}, [dropdownOpen]);

	// Avatar logic: use user.avatar if present, else fallback to default or username-based
	const avatarUrl = user?.avatar
		? user.avatar.startsWith("http")
			? user.avatar
			: `http://localhost:8000${user.avatar}`
		: `/src/default_profile.png`;
	// TODO: Update user object to include avatar from backend for real support

	return (
		<header className="app-header">
			<div className="header-left">
				<h1 className="app-title">
					<Link to="/" className="app-title-link">
						{APP_CONFIG.NAME}
					</Link>
				</h1>
				<nav className="main-nav">
					<Link
						to="/"
						className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
					>
						Home
					</Link>
					<Link
						to="/forum"
						className={`nav-link ${
							location.pathname === "/forum" ? "active" : ""
						}`}
					>
						Forum
					</Link>
				</nav>
			</div>
			<div className="user-info" ref={dropdownRef}>
				<button
					className="user-profile-btn"
					onClick={() => setDropdownOpen((v) => !v)}
				>
					<img src={avatarUrl} alt="User avatar" className="user-avatar" />
					<span className="user-name">{user.username}</span>
				</button>
				{dropdownOpen && (
					<div className="user-dropdown">
						<Button
							as={Link}
							to="/profile"
							variant="ghost"
							size="medium"
							className="user-dropdown-btn"
							onClick={() => setDropdownOpen(false)}
						>
							<span
								className="user-dropdown-btn-icon"
								role="img"
								aria-label="Profile"
							>
								👤
							</span>
							Profile
						</Button>
						<Button
							variant="ghost"
							size="medium"
							className="user-dropdown-btn"
							onClick={() => {
								setDropdownOpen(false);
								logout();
							}}
						>
							<span
								className="user-dropdown-btn-icon"
								role="img"
								aria-label="Logout"
							>
								🚪
							</span>
							Logout
						</Button>
						<div className="user-dropdown-divider" />
						<button
							type="button"
							className="user-dropdown-btn user-dropdown-darkmode-row"
							onClick={toggleTheme}
							style={{
								display: "flex",
								alignItems: "center",
								width: "100%",
								background: "none",
								border: "none",
								cursor: "pointer",
							}}
						>
							<span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>
								{isDark ? (
									<span role="img" aria-label="Switch to light mode">
										🌙
									</span>
								) : (
									<span role="img" aria-label="Switch to dark mode">
										🌞
									</span>
								)}
							</span>
							<span className="user-dropdown-darkmode-label">Dark Mode</span>
						</button>
					</div>
				)}
			</div>
		</header>
	);
}

export default AppHeader;
