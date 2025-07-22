import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, Card } from "../components/ui";
import { APP_CONFIG } from "../utils/constants";
import "../components/layout/Home.css";
import Dropdown from "../components/dropdown/dropdown";

function Home() {
	const { user } = useAuth();

	return (
		<div className="home-page">
			<div className="home-content">
				<h1 className="home-title">Welcome to {APP_CONFIG.NAME}</h1>
				<p className="welcome-message">
					Hello, {user.username}! Welcome to our game development learning
					platform.
				</p>

				<div className="navigation-cards">
					<Card variant="interactive" className="nav-card">
						<Link to="/posts" className="nav-card-link">
							<Card.Body>
								<h3 className="card-title"> 4dd Community Posts</h3>
								<p className="card-description">
									Browse and create posts in our community forum
								</p>
							</Card.Body>
						</Link>
					</Card>

					<Card variant="interactive" className="nav-card">
						<Link to="/profile" className="nav-card-link">
							<Card.Body>
								<h3 className="card-title"> 464 My Profile</h3>
								<p className="card-description">
									View and edit your profile information
								</p>
							</Card.Body>
						</Link>
					</Card>
				</div>
				<Dropdown />

				<div className="quick-actions">
					<h3 className="section-title">Quick Actions</h3>
					<div className="action-buttons">
						<Button as={Link} to="/posts" variant="primary" size="large">
							View Posts
						</Button>
						<Button as={Link} to="/profile" variant="outline" size="large">
							My Profile
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
