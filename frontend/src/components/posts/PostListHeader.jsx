import React from "react";
import { Button, Card } from "../ui";
import "./PostListHeader.css";

function PostListHeader({ onCreatePost, children }) {
	return (
		<Card variant="elevated" className="post-list-header-area">
			<div className="header-content">
				{children}
				<Button
					variant="primary"
					size="large"
					onClick={onCreatePost}
					className="create-post-btn"
				>
					Create Post
				</Button>
			</div>
		</Card>
	);
}

export default PostListHeader;
