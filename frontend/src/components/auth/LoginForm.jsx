import { useState } from "react";

function LoginForm({ onLoginSuccess, onSwitchToRegister }) {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

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
			const response = await fetch("http://localhost:8000/api/auth/login/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Login failed");
			}

			// Store token in localStorage
			localStorage.setItem("authToken", data.token);
			localStorage.setItem(
				"user",
				JSON.stringify({
					id: data.user_id,
					username: data.username,
				})
			);

			// Call the success callback
			if (onLoginSuccess) {
				onLoginSuccess(data);
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="auth-form-container">
			<h2>Login</h2>
			<form className="auth-form" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						required
						placeholder="Enter your username..."
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
						placeholder="Enter your password..."
					/>
				</div>
				{error && <div className="error-message">{error}</div>}
				<button className="auth-button" type="submit" disabled={loading}>
					{loading ? "Logging in..." : "Login"}
				</button>
			</form>
			<div className="auth-switch">
				<p>
					Don't have an account?{" "}
					<button
						type="button"
						className="link-button"
						onClick={onSwitchToRegister}
					>
						Register here
					</button>
				</p>
			</div>
		</div>
	);
}

export default LoginForm;
