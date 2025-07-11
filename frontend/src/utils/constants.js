// ===================================
// APPLICATION CONSTANTS
// ===================================

// API Configuration
export const API_CONFIG = {
	BASE_URL: "http://localhost:8000",
	ENDPOINTS: {
		// Authentication
		AUTH: {
			REGISTER: "/api/auth/register/",
			LOGIN: "/api/auth/login/",
			LOGOUT: "/api/auth/logout/",
			PROFILE: "/api/auth/profile/",
		},
		// Posts
		POSTS: {
			LIST: "/api/posts/",
			CREATE: "/api/posts/",
			DETAIL: (id) => `/api/posts/${id}/`,
			UPDATE: (id) => `/api/posts/${id}/`,
			DELETE: (id) => `/api/posts/${id}/`,
		},
		// Comments
		COMMENTS: {
			LIST: "/api/comments/",
			CREATE: "/api/comments/",
			DETAIL: (id) => `/api/comments/${id}/`,
			UPDATE: (id) => `/api/comments/${id}/`,
			DELETE: (id) => `/api/comments/${id}/`,
		},
		// Profiles
		PROFILES: {
			LIST: "/api/profiles/",
			CURRENT: "/api/profiles/me/",
			DETAIL: (username) => `/api/profiles/${username}/`,
			POSTS: (username) => `/api/profiles/${username}/posts/`,
			AVATAR: "/api/profile/avatar/",
		},
	},
	HEADERS: {
		"Content-Type": "application/json",
	},
};

// Application Settings
export const APP_CONFIG = {
	NAME: "Game-U Platform",
	VERSION: "1.0.0",
	DESCRIPTION: "Educational gaming platform built with React and Django",
	THEME: {
		PRIMARY_COLOR: "#2196f3",
		SECONDARY_COLOR: "#9c27b0",
		SUCCESS_COLOR: "#4caf50",
		WARNING_COLOR: "#ff9800",
		ERROR_COLOR: "#f44336",
	},
};

// User Roles (for Game-U platform)
export const USER_ROLES = {
	STUDENT: "student",
	INSTRUCTOR: "instructor",
	ADMIN: "admin",
};

// User Role Permissions
export const ROLE_PERMISSIONS = {
	[USER_ROLES.STUDENT]: {
		canCreatePosts: true,
		canEditOwnPosts: true,
		canDeleteOwnPosts: true,
		canComment: true,
		canEditOwnComments: true,
		canDeleteOwnComments: true,
		canViewProfiles: true,
		canEditOwnProfile: true,
		canUploadFiles: true,
	},
	[USER_ROLES.INSTRUCTOR]: {
		canCreatePosts: true,
		canEditOwnPosts: true,
		canDeleteOwnPosts: true,
		canComment: true,
		canEditOwnComments: true,
		canDeleteOwnComments: true,
		canViewProfiles: true,
		canEditOwnProfile: true,
		canUploadFiles: true,
		canManageStudents: true,
		canCreateCourses: true,
		canEditCourses: true,
		canDeleteCourses: true,
	},
	[USER_ROLES.ADMIN]: {
		canCreatePosts: true,
		canEditAnyPosts: true,
		canDeleteAnyPosts: true,
		canComment: true,
		canEditAnyComments: true,
		canDeleteAnyComments: true,
		canViewProfiles: true,
		canEditAnyProfile: true,
		canUploadFiles: true,
		canManageUsers: true,
		canManageInstructors: true,
		canManageStudents: true,
		canCreateCourses: true,
		canEditCourses: true,
		canDeleteCourses: true,
		canAccessAdminPanel: true,
	},
};

// File Upload Configuration
export const FILE_CONFIG = {
	MAX_SIZE: 10 * 1024 * 1024, // 10MB
	ALLOWED_TYPES: {
		IMAGES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
		DOCUMENTS: [
			"application/pdf",
			"application/msword",
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		],
		VIDEOS: ["video/mp4", "video/webm", "video/ogg"],
		AUDIO: ["audio/mpeg", "audio/wav", "audio/ogg"],
		GAME_FILES: [".unity", ".godot", ".love", ".exe", ".zip", ".rar"],
	},
	UPLOAD_PATHS: {
		AVATARS: "avatars/",
		POST_IMAGES: "posts/images/",
		COURSE_MATERIALS: "courses/materials/",
		STUDENT_PROJECTS: "projects/",
	},
};

// Pagination Configuration
export const PAGINATION_CONFIG = {
	DEFAULT_PAGE_SIZE: 10,
	MAX_PAGE_SIZE: 100,
	PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
};

// Search Configuration
export const SEARCH_CONFIG = {
	MIN_QUERY_LENGTH: 2,
	MAX_RESULTS: 50,
	DEBOUNCE_DELAY: 300, // milliseconds
};

// Notification Configuration
export const NOTIFICATION_CONFIG = {
	AUTO_HIDE_DURATION: 5000, // 5 seconds
	POSITIONS: {
		TOP_RIGHT: "top-right",
		TOP_LEFT: "top-left",
		BOTTOM_RIGHT: "bottom-right",
		BOTTOM_LEFT: "bottom-left",
	},
	TYPES: {
		SUCCESS: "success",
		ERROR: "error",
		WARNING: "warning",
		INFO: "info",
	},
};

// Local Storage Keys
export const STORAGE_KEYS = {
	AUTH_TOKEN: "authToken",
	USER_DATA: "user",
	THEME: "theme",
	LANGUAGE: "language",
	SIDEBAR_COLLAPSED: "sidebarCollapsed",
	NOTIFICATIONS_ENABLED: "notificationsEnabled",
};

// Route Paths
export const ROUTES = {
	HOME: "/",
	POSTS: "/posts",
	PROFILE: "/profile",
	PROFILE_DETAIL: (username) => `/profile/${username}`,
	LOGIN: "/login",
	REGISTER: "/register",
	SETTINGS: "/settings",
	ADMIN: "/admin",
	COURSES: "/courses",
	PROJECTS: "/projects",
};

// Error Messages
export const ERROR_MESSAGES = {
	NETWORK_ERROR: "Network error. Please check your connection.",
	UNAUTHORIZED: "You are not authorized to perform this action.",
	FORBIDDEN: "Access denied.",
	NOT_FOUND: "The requested resource was not found.",
	VALIDATION_ERROR: "Please check your input and try again.",
	SERVER_ERROR: "Server error. Please try again later.",
	UNKNOWN_ERROR: "An unknown error occurred.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
	POST_CREATED: "Post created successfully!",
	POST_UPDATED: "Post updated successfully!",
	POST_DELETED: "Post deleted successfully!",
	COMMENT_CREATED: "Comment added successfully!",
	COMMENT_UPDATED: "Comment updated successfully!",
	COMMENT_DELETED: "Comment deleted successfully!",
	PROFILE_UPDATED: "Profile updated successfully!",
	AVATAR_UPDATED: "Avatar updated successfully!",
	LOGIN_SUCCESS: "Login successful!",
	LOGOUT_SUCCESS: "Logout successful!",
	REGISTRATION_SUCCESS: "Registration successful!",
};
