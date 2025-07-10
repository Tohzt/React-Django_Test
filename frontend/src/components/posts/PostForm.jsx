import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./PostForm.css";

function PostForm({ onPostCreated }) {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [loading, setLoading] = useState(false);
	const { getAuthHeaders } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch("http://localhost:8000/api/posts/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...getAuthHeaders(),
				},
				body: JSON.stringify({ title, body }),
			});

			if (!response.ok) {
				throw new Error("Failed to create post");
			}

			const newPost = await response.json();
			setTitle("");
			setBody("");

			if (onPostCreated) {
				onPostCreated(newPost);
			}
		} catch (error) {
			console.error("Error creating post:", error);
			alert("Failed to create post. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="post-form-container">
			<h3>Create New Post</h3>
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
					<button className="form-button" type="submit" disabled={loading}>
						{loading ? "Creating..." : "Create Post"}
					</button>
				</form>
			</div>
		</div>
	);
}

export default PostForm;
