import { useState } from "react";
import { Button, Card } from "../ui";
import {
	API_CONFIG,
	ERROR_MESSAGES,
	SUCCESS_MESSAGES,
} from "../../utils/constants";
import "./LoginFormV2.css";

function LoginFormV2({ onLoginSuccess, onSwitchToRegister }) {
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
			const response = await fetch(
				`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`,
				{
					method: "POST",
					headers: API_CONFIG.HEADERS,
					body: JSON.stringify(formData),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || ERROR_MESSAGES.UNKNOWN_ERROR);
			}

			// Store token in localStorage
			localStorage.setItem("authToken", data.token);
			localStorage.setItem(
				"user",
				JSON.stringify({
					id: data.user_id,
					username: data.username,
					avatar: data.avatar || null,
				})
			);

			// Call the success callback
			if (onLoginSuccess) {
				onLoginSuccess({
					user_id: data.user_id,
					username: data.username,
					avatar: data.avatar || null,
				});
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="login-form-container">
			<Card variant="elevated" padding="large" className="login-card">
				<Card.Header>
					<h2 className="login-title">Welcome Back to Game-U</h2>
					<p className="login-subtitle">
						Sign in to continue your learning journey
					</p>
				</Card.Header>

				<Card.Body>
					<form className="login-form" onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="username" className="form-label">
								Username
							</label>
							<input
								type="text"
								id="username"
								name="username"
								value={formData.username}
								onChange={handleChange}
								required
								placeholder="Enter your username..."
								className="form-input"
								disabled={loading}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="password" className="form-label">
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								required
								placeholder="Enter your password..."
								className="form-input"
								disabled={loading}
							/>
						</div>

						{error && (
							<div className="error-message">
								<span className="error-icon">⚠️</span>
								{error}
							</div>
						)}

						<Button
							type="submit"
							variant="primary"
							size="large"
							loading={loading}
							fullWidth
							className="login-button"
						>
							{loading ? "Signing In..." : "Sign In"}
						</Button>
					</form>
				</Card.Body>

				<Card.Footer>
					<div className="login-footer">
						<p className="footer-text">
							Don't have an account?{" "}
							<Button
								type="button"
								variant="ghost"
								size="small"
								onClick={onSwitchToRegister}
								className="switch-button"
							>
								Create Account
							</Button>
						</p>
					</div>
				</Card.Footer>
			</Card>
		</div>
	);
}

export default LoginFormV2;
