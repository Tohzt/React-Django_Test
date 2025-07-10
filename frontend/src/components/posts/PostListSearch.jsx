import { useState, useEffect, useCallback } from "react";
import "./PostListSearch.css";

function PostListSearch({ onSearch }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [isSearching, setIsSearching] = useState(false);

	// Debounced search function
	const debouncedSearch = useCallback(
		(term) => {
			const timeoutId = setTimeout(() => {
				if (onSearch) {
					onSearch(term);
				}
				setIsSearching(false);
			}, 300); // 300ms delay

			return () => clearTimeout(timeoutId);
		},
		[onSearch]
	);

	// Handle search input changes
	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearchTerm(value);
		setIsSearching(true);

		// Clear the previous timeout and set a new one
		debouncedSearch(value);
	};

	// Clear search
	const handleClearSearch = () => {
		setSearchTerm("");
		setIsSearching(false);
		if (onSearch) {
			onSearch("");
		}
	};

	return (
		<div className="search-container">
			<div className="search-input-wrapper">
				<input
					type="text"
					placeholder="Search posts..."
					value={searchTerm}
					onChange={handleSearchChange}
					className="search-input"
				/>
				{isSearching && <div className="search-spinner"></div>}
				{searchTerm && (
					<button
						onClick={handleClearSearch}
						className="clear-search-btn"
						title="Clear search"
					>
						×
					</button>
				)}
			</div>
		</div>
	);
}

export default PostListSearch;
