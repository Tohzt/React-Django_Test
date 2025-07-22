import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui";
import { API_CONFIG } from "../utils/constants";
import "../components/forum/ForumPage.css";

function ForumPage() {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchCategories() {
			try {
				const res = await fetch(`${API_CONFIG.BASE_URL}/api/categories/`);
				const data = await res.json();
				setCategories(data);
			} catch (err) {
				console.error("Failed to fetch categories", err);
			} finally {
				setLoading(false);
			}
		}
		fetchCategories();
	}, []);

	return (
		<div className="forum-page">
			<h1 className="forum-title">Forum</h1>
			<p className="forum-description">
				Welcome to the forum! Choose a category to browse topics and
				discussions.
			</p>

			{/* Control Bar */}
			<div className="forum-control-bar">
				<div className="forum-control-left">
					<span className="forum-filter-label">Categories</span>
				</div>
				<div className="forum-control-right">
					<span className="forum-stats">
						{loading ? "Loading..." : `${categories.length} categories`}
					</span>
				</div>
			</div>

			{/* Categories Table */}
			<div className="forum-topics-container">
				{/* Table Header */}
				<div className="forum-topics-header">
					<div className="topic-status">Status</div>
					<div className="topic-title">Categories</div>
					<div className="topic-replies">Topics</div>
					<div className="topic-views">Posts</div>
					<div className="topic-author">Last Post</div>
					<div className="topic-date">Last Activity</div>
				</div>

				{/* Categories List */}
				<div className="forum-topics-list">
					{loading ? (
						<div className="forum-no-topics">
							<p>Loading categories...</p>
						</div>
					) : categories.length === 0 ? (
						<div className="forum-no-topics">
							<p>No categories found.</p>
						</div>
					) : (
						categories.map((cat, index) => (
							<Link
								key={cat.id}
								to={`/forum/${cat.slug}`}
								className={`forum-topic-row-link ${
									index % 2 === 0 ? "row-even" : "row-odd"
								}`}
							>
								<div className="forum-topic-row">
									<div className="topic-status">
										<span className="topic-status-normal"> 4c1</span>
									</div>
									<div className="topic-title">
										<span className="topic-title-link">{cat.name}</span>
										<div className="topic-tags">
											<span className="topic-tag">{cat.description}</span>
										</div>
									</div>
									<div className="topic-replies">{cat.posts_count || 0}</div>
									<div className="topic-views">{cat.posts_count || 0}</div>
									<div className="topic-author">
										{cat.last_post ? (
											<>
												<span className="topic-author-link">
													{cat.last_post.author_username}
												</span>
												<div className="topic-tags">
													<span className="topic-tag">
														{cat.last_post.title}
													</span>
												</div>
											</>
										) : (
											<span className="topic-no-posts">No posts</span>
										)}
									</div>
									<div className="topic-date">
										{cat.last_post ? (
											new Date(cat.last_post.created_at).toLocaleDateString()
										) : (
											<span className="topic-no-posts">Never</span>
										)}
									</div>
								</div>
							</Link>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default ForumPage;
