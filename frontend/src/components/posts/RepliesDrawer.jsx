import React, { useRef, useEffect, useState } from "react";
import "./RepliesDrawer.css";

const DRAWER_COLLAPSED_HEIGHT = 56;
const DRAWER_MAX_EXPANDED_HEIGHT = 520;

function RepliesDrawer({
	expanded,
	onToggle,
	comments = [],
	loading = false,
	inputValue = "",
	onInputChange,
	onAddComment,
	disabled = false,
	postId,
	commentsCount = 0,
}) {
	const contentRef = useRef(null);
	const [contentHeight, setContentHeight] = useState(0);

	useEffect(() => {
		if (expanded && contentRef.current) {
			setContentHeight(contentRef.current.scrollHeight);
		}
	}, [expanded, comments, loading]);

	return (
		<div className={`replies-drawer${expanded ? " expanded" : ""}`}>
			<div className="replies-drawer-inner">
				<div className="replies-drawer-btn-row">
					<button className="replies-drawer-toggle" onClick={onToggle}>
						<span
							role="img"
							aria-label="replies"
							style={{ fontSize: "1.1em", marginRight: 6 }}
						>
							💬
						</span>
						{commentsCount} Replies
						<span style={{ marginLeft: 8, fontSize: 14 }}>
							{expanded ? "▲" : "▼"}
						</span>
					</button>
				</div>
				<div
					className={`replies-drawer-content${expanded ? " expanded" : ""}`}
					style={{
						opacity: expanded ? 1 : 0,
						transition: "opacity 0.3s ease",
						pointerEvents: expanded ? "auto" : "none",
					}}
				>
					<div className="replies-drawer-scroll" ref={contentRef}>
						{loading ? (
							<div>Loading replies...</div>
						) : (
							<>
								<div className="post-comments-list">
									{comments.length > 0 ? (
										comments.map((c) => (
											<div key={c.id} className="post-comment">
												<div
													style={{
														display: "flex",
														alignItems: "center",
														gap: "0.5rem",
													}}
												>
													<img
														src={
															c.avatar
																? `http://localhost:8000${c.avatar}`
																: "/src/default_profile.png"
														}
														alt={c.author_username || "User avatar"}
														className="post-avatar-small"
														style={{
															width: 28,
															height: 28,
															borderRadius: "50%",
														}}
													/>
													<span className="post-comment-author">
														{c.author_username || "Anonymous"}
													</span>
												</div>
												<span className="post-comment-body">{c.body}</span>
												<span className="post-comment-date">
													{new Date(c.created_at).toLocaleString()}
												</span>
											</div>
										))
									) : (
										<div className="post-comment-empty">No replies yet.</div>
									)}
								</div>
							</>
						)}
					</div>
					<div className="post-comment-input-row">
						<input
							type="text"
							className="post-comment-input"
							placeholder="Write a reply..."
							value={inputValue}
							onChange={(e) => onInputChange(postId, e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") onAddComment(postId);
							}}
							disabled={disabled}
						/>
						<button
							className="post-comment-submit"
							onClick={() => onAddComment(postId)}
							disabled={disabled || !inputValue.trim()}
						>
							Reply
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RepliesDrawer;
