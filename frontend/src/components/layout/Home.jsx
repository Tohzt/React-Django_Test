import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Home.css";

function Home() {
	const { user } = useAuth();

	return (
		<div className="home-page">
			<div className="home-content">
				<h1>Welcome to React + Django TestApp</h1>
				<p className="welcome-message">
					Hello, {user.username}! Welcome to our community platform.
				</p>

				<div className="navigation-cards">
					<Link to="/posts" className="nav-card">
						<div className="card-content">
							<h3>📝 Community Posts</h3>
							<p>Browse and create posts in our community forum</p>
						</div>
					</Link>

					<Link to="/profile" className="nav-card">
						<div className="card-content">
							<h3>👤 My Profile</h3>
							<p>View and edit your profile information</p>
						</div>
					</Link>
				</div>

				<div className="quick-actions">
					<h3>Quick Actions</h3>
					<div className="action-buttons">
						<Link to="/posts" className="action-button primary">
							View Posts
						</Link>
						<Link to="/profile" className="action-button secondary">
							My Profile
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
