import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import EditProfileForm from "./EditProfileForm";
import "./Profile.css";

function Profile({ username, isOwnProfile = false }) {
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const { getAuthHeaders } = useAuth();

	useEffect(() => {
		fetchProfile();
	}, [username]);

	const fetchProfile = async () => {
		try {
			const url = isOwnProfile
				? "http://localhost:8000/api/profiles/me/"
				: `http://localhost:8000/api/profiles/${username}/`;

			const response = await fetch(url, {
				headers: getAuthHeaders(),
			});

			if (!response.ok) {
				throw new Error("Failed to fetch profile");
			}

			const data = await response.json();
			setProfile(data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleEditSuccess = (updatedProfile) => {
		setProfile(updatedProfile);
		setIsEditing(false);
		setShowToast(true);
		setTimeout(() => setShowToast(false), 2000);
	};

	const handleEditCancel = () => {
		setIsEditing(false);
	};

	if (loading) return <div className="profile-loading">Loading profile...</div>;
	if (error) return <div className="profile-error">Error: {error}</div>;
	if (!profile)
		return <div className="profile-not-found">Profile not found</div>;

	return (
		<div className="profile-container">
			{showToast && <div className="toast">Profile updated!</div>}
			{isEditing && (
				<EditProfileForm
					profile={profile}
					onEditSuccess={handleEditSuccess}
					onCancel={handleEditCancel}
				/>
			)}
			<div className="profile-header">
				<div className="profile-avatar">
					<img
						src={
							profile.avatar
								? `http://localhost:8000${profile.avatar}`
								: "/src/default_profile.png"
						}
						alt={`${profile.username}'s avatar`}
						className="avatar-image"
					/>
				</div>
				<div className="profile-info">
					<h2 className="profile-name">
						{profile.first_name && profile.last_name
							? `${profile.first_name} ${profile.last_name}`
							: profile.username}
					</h2>
					<p className="profile-username">@{profile.username}</p>
					{profile.location && (
						<p className="profile-location">📍 {profile.location}</p>
					)}
					{profile.website && (
						<p className="profile-website">
							🌐{" "}
							<a
								href={profile.website}
								target="_blank"
								rel="noopener noreferrer"
							>
								{profile.website}
							</a>
						</p>
					)}
				</div>
				{isOwnProfile && (
					<button
						className="edit-profile-button"
						onClick={() => setIsEditing(true)}
					>
						Edit Profile
					</button>
				)}
			</div>

			<div className="profile-stats">
				<div className="stat">
					<span className="stat-number">{profile.post_count}</span>
					<span className="stat-label">Posts</span>
				</div>
				<div className="stat">
					<span className="stat-number">
						{new Date(profile.created_at).getFullYear()}
					</span>
					<span className="stat-label">Joined</span>
				</div>
			</div>

			{profile.bio && (
				<div className="profile-bio">
					<h3>About</h3>
					<p>{profile.bio}</p>
				</div>
			)}

			{profile.recent_posts && profile.recent_posts.length > 0 && (
				<div className="profile-posts">
					<h3>Recent Posts</h3>
					<div className="recent-posts-list">
						{profile.recent_posts.map((post) => (
							<div key={post.id} className="recent-post">
								<h4>{post.title}</h4>
								<p>{post.body.substring(0, 100)}...</p>
								<small>{new Date(post.created_at).toLocaleDateString()}</small>
							</div>
						))}
					</div>
					{profile.post_count > 5 && (
						<a
							href={`/profile/${profile.username}/posts`}
							className="view-all-posts"
						>
							View all {profile.post_count} posts →
						</a>
					)}
				</div>
			)}
		</div>
	);
}

export default Profile;
