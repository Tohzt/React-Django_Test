import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// Check if user is logged in on app start
	useEffect(() => {
		const token = localStorage.getItem("authToken");
		const userData = localStorage.getItem("user");

		if (token && userData) {
			setUser(JSON.parse(userData));
		}
		setLoading(false);
	}, []);

	const login = (userData) => {
		setUser({
			id: userData.user_id,
			username: userData.username,
			avatar: userData.avatar || null,
		});
		// Also update localStorage to include avatar
		const storedUser = {
			id: userData.user_id,
			username: userData.username,
			avatar: userData.avatar || null,
		};
		localStorage.setItem("user", JSON.stringify(storedUser));
	};

	const logout = async () => {
		try {
			// Call logout endpoint
			const token = localStorage.getItem("authToken");
			if (token) {
				await fetch("http://localhost:8000/api/auth/logout/", {
					method: "POST",
					headers: {
						Authorization: `Token ${token}`,
						"Content-Type": "application/json",
					},
				});
			}
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			// Clear local storage and state
			localStorage.removeItem("authToken");
			localStorage.removeItem("user");
			setUser(null);
		}
	};

	const getAuthHeaders = () => {
		const token = localStorage.getItem("authToken");
		return token ? { Authorization: `Token ${token}` } : {};
	};

	const value = {
		user,
		login,
		logout,
		getAuthHeaders,
		isAuthenticated: !!user,
		loading,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
