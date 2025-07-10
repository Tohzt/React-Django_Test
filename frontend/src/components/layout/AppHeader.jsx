import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AppHeader.css";

function AppHeader() {
	const { user, logout } = useAuth();
	const location = useLocation();

	return (
		<header className="app-header">
			<div className="header-left">
				<h1>
					<Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
						React + Django TestApp
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
						to="/posts"
						className={`nav-link ${
							location.pathname === "/posts" ? "active" : ""
						}`}
					>
						Posts
					</Link>
				</nav>
			</div>
			<div className="user-info">
				<Link to="/profile" className="profile-link">
					{user.username}
				</Link>
				<button onClick={logout} className="logout-button">
					Logout
				</button>
			</div>
		</header>
	);
}

export default AppHeader;
