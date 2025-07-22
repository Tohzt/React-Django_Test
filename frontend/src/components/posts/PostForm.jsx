import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui";
import { API_CONFIG, ERROR_MESSAGES } from "../../utils/constants";
import "./PostForm.css";

function PostForm({ onPostCreated }) {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [loading, setLoading] = useState(false);
	const [tagsInput, setTagsInput] = useState("");
	const { getAuthHeaders } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const tags = tagsInput
			.split(",")
			.map((t) => t.trim())
			.filter((t) => t.length > 0);

		try {
			const response = await fetch(
				`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS.CREATE}`,
				{
					method: "POST",
					headers: {
						...API_CONFIG.HEADERS,
						...getAuthHeaders(),
					},
					body: JSON.stringify({ title, body, tags }),
				}
			);

			if (!response.ok) {
				throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
			}

			const newPost = await response.json();
			setTitle("");
			setBody("");
			setTagsInput("");

			if (onPostCreated) {
				onPostCreated(newPost);
			}
		} catch (error) {
			console.error("Error creating post:", error);
			alert(ERROR_MESSAGES.NETWORK_ERROR);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="post-form-container">
			<h3 className="form-title">Create New Post</h3>
			<div className="post-form">
				<form className="form-container" onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="title">Title:</label>
						<input
							type="text"
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
							placeholder="Enter post title..."
						/>
					</div>
					<div className="form-group">
						<label htmlFor="body">Content:</label>
						<textarea
							id="body"
							value={body}
							onChange={(e) => setBody(e.target.value)}
							required
							placeholder="Enter post content..."
							rows="4"
							style={{ resize: "none" }}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="tags">Tags:</label>
						<input
							type="text"
							id="tags"
							value={tagsInput}
							onChange={(e) => setTagsInput(e.target.value)}
							placeholder="Enter tags, separated by commas"
						/>
					</div>
					<Button
						variant="primary"
						size="large"
						type="submit"
						disabled={loading}
						className="form-button"
					>
						{loading ? "Creating..." : "Create Post"}
					</Button>
				</form>
			</div>
		</div>
	);
}

export default PostForm;
