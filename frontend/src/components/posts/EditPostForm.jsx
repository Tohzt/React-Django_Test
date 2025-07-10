import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function EditPostForm({ post, onEditSuccess, onCancel }) {
	const [formData, setFormData] = useState({
		title: "",
		body: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { getAuthHeaders } = useAuth();

	// Initialize form with current post data
	useEffect(() => {
		if (post) {
			setFormData({
				title: post.title,
				body: post.body,
			});
		}
	}, [post]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
		setError(""); // Clear error when user starts typing
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const response = await fetch(
				`http://localhost:8000/api/posts/${post.id}/`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						...getAuthHeaders(),
					},
					body: JSON.stringify(formData),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to update post");
			}

			// Call the success callback
			if (onEditSuccess) {
				onEditSuccess(data);
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	if (!post) return null;

	return (
		<div className="edit-post-modal">
			<div className="edit-post-content">
				<h3>Edit Post</h3>
				<form className="edit-post-form" onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="edit-title">Title:</label>
						<input
							type="text"
							id="edit-title"
							name="title"
							value={formData.title}
							onChange={handleChange}
							required
							placeholder="Enter post title..."
						/>
					</div>
					<div className="form-group">
						<label htmlFor="edit-body">Content:</label>
						<textarea
							id="edit-body"
							name="body"
							value={formData.body}
							onChange={handleChange}
							required
							placeholder="Enter post content..."
							rows="4"
							style={{ resize: "none" }}
						/>
					</div>
					{error && <div className="error-message">{error}</div>}
					<div className="edit-actions">
						<button
							type="button"
							className="cancel-button"
							onClick={onCancel}
							disabled={loading}
						>
							Cancel
						</button>
						<button className="save-button" type="submit" disabled={loading}>
							{loading ? "Saving..." : "Save Changes"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default EditPostForm;
