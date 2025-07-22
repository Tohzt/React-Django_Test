import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button } from "../ui";
import { API_CONFIG } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";
import "./PostDetail.css";

function PostDetail() {
	const { id } = useParams();
	const { user } = useAuth();
	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [newComment, setNewComment] = useState("");
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		async function fetchPostAndComments() {
			try {
				// Fetch the post
				const postRes = await fetch(`${API_CONFIG.BASE_URL}/api/posts/${id}/`);
				if (!postRes.ok) throw new Error("Post not found");
				const postData = await postRes.json();
				setPost(postData);

				// Fetch comments for this post
				const commentsRes = await fetch(
					`${API_CONFIG.BASE_URL}/api/comments/?post=${id}`
				);
				const commentsData = await commentsRes.json();
				setComments(commentsData);
			} catch (err) {
				console.error(err);
				setPost(null);
			} finally {
				setLoading(false);
			}
		}
		fetchPostAndComments();
	}, [id]);

	const handleSubmitComment = async (e) => {
		e.preventDefault();
		if (!newComment.trim()) return;

		setSubmitting(true);
		try {
			const response = await fetch(`${API_CONFIG.BASE_URL}/api/comments/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("authToken")}`,
				},
				body: JSON.stringify({
					post: id,
					body: newComment.trim(),
				}),
			});

			if (response.ok) {
				const commentData = await response.json();
				setComments([...comments, commentData]);
				setNewComment("");
			}
		} catch (err) {
			console.error("Failed to add comment", err);
		} finally {
			setSubmitting(false);
		}
	};

	if (loading) return <div className="post-detail-page">Loading...</div>;
	if (!post) return <div className="post-detail-page">Post not found.</div>;

	return (
		<div className="post-detail-page">
			<Link
				to={`/forum/${post.category_slug || "general"}`}
				className="post-detail-breadcrumb"
			>
				← Back to {post.category_name || "General Discussion"}
			</Link>

			<Card className="post-detail-card">
				<div className="post-detail-header">
					<h1 className="post-detail-title">{post.title}</h1>
					<div className="post-detail-meta">
						By <b>{post.author_username}</b> •{" "}
						{new Date(post.created_at).toLocaleString()}
						{post.views_count > 0 && ` • ${post.views_count} views`}
					</div>
					{post.tags && post.tags.length > 0 && (
						<div className="post-detail-tags">
							{post.tags.map((tag, index) => (
								<span key={index} className="post-detail-tag">
									{tag}
								</span>
							))}
						</div>
					)}
				</div>

				<div className="post-detail-body">{post.body}</div>
			</Card>

			<div className="comments-section">
				<h2 className="comments-title">Comments ({comments.length})</h2>

				{user && (
					<Card className="comment-form-card">
						<form onSubmit={handleSubmitComment}>
							<textarea
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
								placeholder="Add a comment..."
								className="comment-input"
								rows="3"
							/>
							<Button
								type="submit"
								variant="primary"
								disabled={submitting || !newComment.trim()}
								style={{ marginTop: "0.5rem" }}
							>
								{submitting ? "Posting..." : "Post Comment"}
							</Button>
						</form>
					</Card>
				)}

				<div className="comments-list">
					{comments.length === 0 ? (
						<p className="no-comments">
							No comments yet. Be the first to comment!
						</p>
					) : (
						comments.map((comment) => (
							<Card key={comment.id} className="comment-card">
								<div className="comment-header">
									<b>{comment.author_username}</b>
									<span className="comment-date">
										{new Date(comment.created_at).toLocaleString()}
									</span>
								</div>
								<div className="comment-body">{comment.body}</div>
							</Card>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default PostDetail;
