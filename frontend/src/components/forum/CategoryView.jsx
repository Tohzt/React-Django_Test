import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../ui";
import PostList from "../posts/PostList";
import { API_CONFIG } from "../../utils/constants";
import "./ForumPage.css";

function CategoryView() {
	const { categorySlug } = useParams();
	const [category, setCategory] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchCategory() {
			try {
				const catRes = await fetch(
					`${API_CONFIG.BASE_URL}/api/categories/${categorySlug}/`
				);
				if (!catRes.ok) throw new Error("Category not found");
				const catData = await catRes.json();
				setCategory(catData);
			} catch (err) {
				setCategory(null);
				console.error(err);
			} finally {
				setLoading(false);
			}
		}
		fetchCategory();
	}, [categorySlug]);

	if (loading) return <div className="forum-page">Loading...</div>;
	if (!category) return <div className="forum-page">Category not found.</div>;

	return (
		<div className="forum-page">
			<Link to="/forum" className="forum-breadcrumb">
				← Back to Forum Index
			</Link>

			{/* Header */}
			<div className="forum-category-header">
				<h1 className="forum-title">{category.name}</h1>
				<p className="forum-description">{category.description}</p>
			</div>

			{/* Control Bar */}
			<div className="forum-control-bar">
				<div className="forum-control-left">
					<span className="forum-filter-label">Topics</span>
				</div>
				<div className="forum-control-right">
					<Button as={Link} to="/posts" variant="primary" size="small">
						+ Add Topic
					</Button>
				</div>
			</div>

			{/* Use PostList with category filter */}
			<PostList categorySlug={categorySlug} />
		</div>
	);
}

export default CategoryView;
