import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button, Card } from "../ui";
import { API_CONFIG, ERROR_MESSAGES } from "../../utils/constants";
import EditPostForm from "./EditPostForm";
import "./PostList.css";
import RepliesDrawer from "./RepliesDrawer";

function PostList({ refreshTrigger, searchTerm = "", categorySlug = null }) {
	const [posts, setPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [contextMenu, setContextMenu] = useState({
		show: false,
		x: 0,
		y: 0,
		postId: null,
		isOwnPost: false,
	});
	const [editingPost, setEditingPost] = useState(null);
	const [expandedPostId, setExpandedPostId] = useState(null);
	const [comments, setComments] = useState({}); // { postId: [comments] }
	const [commentInputs, setCommentInputs] = useState({}); // { postId: inputValue }
	const [commentLoading, setCommentLoading] = useState({}); // { postId: bool }
	const { user, getAuthHeaders } = useAuth();

	useEffect(() => {
		fetchPosts();
	}, [refreshTrigger, categorySlug]);

	// Filter posts based on search term and category
	useEffect(() => {
		let filtered = posts;

		// Filter by category if provided
		if (categorySlug) {
			filtered = filtered.filter((post) => post.category_slug === categorySlug);
		}

		// Filter by search term if provided
		if (searchTerm.trim()) {
			const searchLower = searchTerm.toLowerCase();
			filtered = filtered.filter((post) => {
				return (
					post.title.toLowerCase().includes(searchLower) ||
					post.body.toLowerCase().includes(searchLower) ||
					(post.author_username &&
						post.author_username.toLowerCase().includes(searchLower))
				);
			});
		}

		setFilteredPosts(filtered);
	}, [posts, searchTerm, categorySlug]);

	// Close context menu when clicking outside
	useEffect(() => {
		const handleClickOutside = () => {
			setContextMenu({
				show: false,
				x: 0,
				y: 0,
				postId: null,
				isOwnPost: false,
			});
		};

		if (contextMenu.show) {
			document.addEventListener("click", handleClickOutside);
			return () => document.removeEventListener("click", handleClickOutside);
		}
	}, [contextMenu.show]);

	const fetchPosts = async () => {
		try {
			const response = await fetch(
				`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS.LIST}`,
				{
					headers: getAuthHeaders(),
				}
			);
			if (!response.ok) {
				throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
			}
			const data = await response.json();
			setPosts(data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const fetchComments = async (postId) => {
		setCommentLoading((prev) => ({ ...prev, [postId]: true }));
		try {
			const response = await fetch(
				`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COMMENTS.LIST}?post=${postId}`
			);
			if (!response.ok) throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
			const data = await response.json();
			setComments((prev) => ({ ...prev, [postId]: data }));
		} catch (err) {
			setComments((prev) => ({ ...prev, [postId]: [] }));
		} finally {
			setCommentLoading((prev) => ({ ...prev, [postId]: false }));
		}
	};

	const handleContextMenu = (e, postId, isOwnPost = false) => {
		e.preventDefault();
		setContextMenu({
			show: true,
			x: e.clientX,
			y: e.clientY,
			postId: postId,
			isOwnPost: isOwnPost,
		});
	};

	const handleEdit = () => {
		const postToEdit = posts.find((post) => post.id === contextMenu.postId);
		if (postToEdit) {
			setEditingPost(postToEdit);
		}
		setContextMenu({ show: false, x: 0, y: 0, postId: null, isOwnPost: false });
	};

	const handleDelete = async () => {
		if (!contextMenu.postId) return;

		try {
			const response = await fetch(
				`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS.DELETE(
					contextMenu.postId
				)}`,
				{
					method: "DELETE",
					headers: getAuthHeaders(),
				}
			);

			if (!response.ok) {
				throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
			}

			// Remove the deleted post from the local state
			setPosts(posts.filter((post) => post.id !== contextMenu.postId));
			setContextMenu({
				show: false,
				x: 0,
				y: 0,
				postId: null,
				isOwnPost: false,
			});
		} catch (err) {
			setError(err.message);
		}
	};

	const handleEditSuccess = (updatedPost) => {
		// Update the post in the local state
		setPosts(
			posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
		);
		setEditingPost(null);
	};

	const handleEditCancel = () => {
		setEditingPost(null);
	};

	const handleExpandComments = (postId) => {
		if (expandedPostId === postId) {
			setExpandedPostId(null);
		} else {
			setExpandedPostId(postId);
			if (!comments[postId]) fetchComments(postId);
		}
	};

	const handleCommentInputChange = (postId, value) => {
		setCommentInputs((prev) => ({ ...prev, [postId]: value }));
	};

	const handleAddComment = async (postId) => {
		const body = commentInputs[postId]?.trim();
		if (!body) return;
		setCommentLoading((prev) => ({ ...prev, [postId]: true }));
		try {
			const response = await fetch(
				`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COMMENTS.CREATE}`,
				{
					method: "POST",
					headers: {
						...API_CONFIG.HEADERS,
						...getAuthHeaders(),
					},
					body: JSON.stringify({ post: postId, body }),
				}
			);
			if (!response.ok) throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
			setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
			fetchComments(postId);
		} catch (err) {
			alert("Failed to add comment");
		} finally {
			setCommentLoading((prev) => ({ ...prev, [postId]: false }));
		}
	};

	// Placeholder functions for other users' posts
	const handleViewProfile = () => {
		alert("View Profile functionality coming soon!");
		setContextMenu({ show: false, x: 0, y: 0, postId: null, isOwnPost: false });
	};

	const handleReportPost = () => {
		alert("Report Post functionality coming soon!");
		setContextMenu({ show: false, x: 0, y: 0, postId: null, isOwnPost: false });
	};

	const handleSharePost = () => {
		alert("Share Post functionality coming soon!");
		setContextMenu({ show: false, x: 0, y: 0, postId: null, isOwnPost: false });
	};

	if (error)
		return (
			<div className="error-message">
				<span className="error-icon">⚠️</span>
				Error: {error}
			</div>
		);

	return (
		<div className="post-list">
			<h2 className="post-list-title">Community Posts</h2>
			{loading && posts.length === 0 ? (
				<div className="loading-message">Loading posts...</div>
			) : filteredPosts.length === 0 ? (
				<div className="empty-state">
					<p className="empty-message">
						{searchTerm
							? `No posts found matching "${searchTerm}"`
							: "No posts found. Create some posts to get started!"}
					</p>
				</div>
			) : (
				<div className="posts">
					{filteredPosts.map((post) => (
						<>
							<Card
								variant="elevated"
								className="post-container"
								key={post.id}
								style={{ position: "relative" }}
							>
								<Card.Body
									className="post"
									onContextMenu={(e) => {
										handleContextMenu(e, post.id, post.author === user?.id);
									}}
								>
									<div className="post-meta-row">
										<img
											src={
												post.avatar
													? `http://localhost:8000${post.avatar}`
													: "/src/default_profile.png"
											}
											alt={post.author_username || "User avatar"}
											className="post-avatar-small"
										/>
										<span className="post-username">
											{post.author_username || "Anonymous"}
										</span>
									</div>
									<h3 className="post-title">{post.title}</h3>
									{post.tags && post.tags.length > 0 && (
										<div className="post-tags">
											{post.tags.map((tag) => (
												<span className="post-tag" key={tag}>
													{tag}
												</span>
											))}
										</div>
									)}
									<p className="post-body">{post.body}</p>
									<span className="post-timestamp">
										{new Date(post.created_at).toLocaleDateString()}
									</span>
								</Card.Body>
							</Card>
							<RepliesDrawer
								expanded={expandedPostId === post.id}
								onToggle={() => handleExpandComments(post.id)}
								comments={comments[post.id] || []}
								loading={commentLoading[post.id]}
								inputValue={commentInputs[post.id] || ""}
								onInputChange={handleCommentInputChange}
								onAddComment={handleAddComment}
								disabled={commentLoading[post.id]}
								postId={post.id}
								commentsCount={
									comments[post.id]?.length ?? post.comments_count ?? 0
								}
							/>
						</>
					))}
				</div>
			)}

			{/* Context Menu */}
			{contextMenu.show && (
				<div
					className="context-menu"
					style={{
						position: "fixed",
						top: contextMenu.y,
						left: contextMenu.x,
						backgroundColor: "white",
						border: "1px solid #ccc",
						borderRadius: "4px",
						boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
						zIndex: 1000,
						minWidth: "120px",
					}}
				>
					{contextMenu.isOwnPost ? (
						// Options for user's own posts
						<>
							<button
								onClick={handleEdit}
								style={{
									width: "100%",
									padding: "8px 12px",
									border: "none",
									backgroundColor: "transparent",
									cursor: "pointer",
									textAlign: "left",
									color: "#1976d2",
									borderBottom: "1px solid #eee",
								}}
								onMouseEnter={(e) =>
									(e.target.style.backgroundColor = "#f5f5f5")
								}
								onMouseLeave={(e) =>
									(e.target.style.backgroundColor = "transparent")
								}
							>
								Edit
							</button>
							<button
								onClick={handleDelete}
								style={{
									width: "100%",
									padding: "8px 12px",
									border: "none",
									backgroundColor: "transparent",
									cursor: "pointer",
									textAlign: "left",
									color: "#d32f2f",
								}}
								onMouseEnter={(e) =>
									(e.target.style.backgroundColor = "#f5f5f5")
								}
								onMouseLeave={(e) =>
									(e.target.style.backgroundColor = "transparent")
								}
							>
								Delete
							</button>
						</>
					) : (
						// Options for other users' posts
						<>
							<button
								onClick={handleViewProfile}
								style={{
									width: "100%",
									padding: "8px 12px",
									border: "none",
									backgroundColor: "transparent",
									cursor: "pointer",
									textAlign: "center",
									color: "#1976d2",
									borderBottom: "1px solid #eee",
								}}
								onMouseEnter={(e) =>
									(e.target.style.backgroundColor = "#f5f5f5")
								}
								onMouseLeave={(e) =>
									(e.target.style.backgroundColor = "transparent")
								}
							>
								View Profile
							</button>
							<button
								onClick={handleSharePost}
								style={{
									width: "100%",
									padding: "8px 12px",
									border: "none",
									backgroundColor: "transparent",
									cursor: "pointer",
									textAlign: "center",
									color: "#28a745",
									borderBottom: "1px solid #eee",
								}}
								onMouseEnter={(e) =>
									(e.target.style.backgroundColor = "#f5f5f5")
								}
								onMouseLeave={(e) =>
									(e.target.style.backgroundColor = "transparent")
								}
							>
								Share Post
							</button>
							<button
								onClick={handleReportPost}
								style={{
									width: "100%",
									padding: "8px 12px",
									border: "none",
									backgroundColor: "transparent",
									cursor: "pointer",
									textAlign: "center",
									color: "#ffc107",
								}}
								onMouseEnter={(e) =>
									(e.target.style.backgroundColor = "#f5f5f5")
								}
								onMouseLeave={(e) =>
									(e.target.style.backgroundColor = "transparent")
								}
							>
								Report Post
							</button>
						</>
					)}
				</div>
			)}

			{/* Edit Post Modal */}
			{editingPost && (
				<EditPostForm
					post={editingPost}
					onEditSuccess={handleEditSuccess}
					onCancel={handleEditCancel}
				/>
			)}
		</div>
	);
}

export default PostList;
