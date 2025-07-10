import { useState } from "react";
import PostList from "./PostList";
import PostForm from "./PostForm";
import PostListHeader from "./PostListHeader";
import PostListSearch from "./PostListSearch";
import BaseModal from "../modals/BaseModal";
import "./Posts.css";

function Posts() {
	const [refreshTrigger, setRefreshTrigger] = useState(0);
	const [showPostModal, setShowPostModal] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const handlePostCreated = () => {
		setRefreshTrigger((prev) => prev + 1);
		setShowPostModal(false);
	};

	const handleSearch = (term) => {
		setSearchTerm(term);
	};

	return (
		<div className="posts-page">
			<PostListHeader onCreatePost={() => setShowPostModal(true)}>
				<PostListSearch onSearch={handleSearch} />
			</PostListHeader>
			<PostList
				refreshTrigger={refreshTrigger}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
			/>
			<BaseModal isOpen={showPostModal} onClose={() => setShowPostModal(false)}>
				<PostForm onPostCreated={handlePostCreated} />
			</BaseModal>
		</div>
	);
}

export default Posts;
