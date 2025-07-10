import React from "react";
import "./PostListHeader.css";

function PostListHeader({ onCreatePost, children }) {
	return (
		<div className="post-list-header-area">
			{children}
			<button className="create-post-btn" onClick={onCreatePost}>
				Create Post
			</button>
		</div>
	);
}

export default PostListHeader;
