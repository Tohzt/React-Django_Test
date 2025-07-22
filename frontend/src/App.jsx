import { Routes, Route } from "react-router-dom";
import AuthContainer from "./components/auth/AuthContainer";
import { useAuth } from "./context/AuthContext";
import Profile from "./pages/Profile";
import AppHeader from "./components/layout/AppHeader";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetail from "./components/posts/PostDetail";
import ForumPage from "./pages/ForumPage";
import CategoryView from "./components/forum/CategoryView";
import "./App.css";

function App() {
	const { user, loading } = useAuth();

	if (loading) {
		return <div className="App">Loading...</div>;
	}

	return (
		<div className="App">
			{user ? (
				<>
					<AppHeader />
					<main className="main-container">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/posts" element={<Posts />} />
							<Route path="/posts/:id" element={<PostDetail />} />
							<Route path="/forum" element={<ForumPage />} />
							<Route path="/forum/:categorySlug" element={<CategoryView />} />
							<Route
								path="/profile"
								element={
									<Profile isOwnProfile={true} username={user.username} />
								}
							/>
							<Route
								path="/profile/:username"
								element={<Profile isOwnProfile={false} />}
							/>
						</Routes>
					</main>
				</>
			) : (
				<AuthContainer />
			)}
		</div>
	);
}

export default App;
