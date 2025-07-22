import { useState } from "react";
import { Button, Card } from "../ui";
import { API_CONFIG, ERROR_MESSAGES } from "../../utils/constants";

function RegisterFormV2({ onRegisterSuccess, onSwitchToLogin }) {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
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

	const validateForm = () => {
		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match");
			return false;
		}
		if (formData.password.length < 8) {
			setError("Password must be at least 8 characters long");
			return false;
		}
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setLoading(true);
		setError("");

		try {
			const response = await fetch(
				`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`,
				{
					method: "POST",
					headers: API_CONFIG.HEADERS,
					body: JSON.stringify({
						username: formData.username,
						email: formData.email,
						password: formData.password,
					}),
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
			if (onRegisterSuccess) {
				onRegisterSuccess({
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
		<div className="register-form-container">
			<Card variant="elevated" padding="large" className="register-card">
				<Card.Header>
					<h2 className="register-title">Create Your Account</h2>
					<p className="register-subtitle">
						Sign up to join the community and start posting.
					</p>
				</Card.Header>

				<Card.Body>
					<form
						className="register-form two-column-form"
						onSubmit={handleSubmit}
					>
						<div className="form-columns">
							<div className="form-col">
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
										placeholder="Choose a username..."
										className="form-input"
										disabled={loading}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="email" className="form-label">
										Email
									</label>
									<input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										required
										placeholder="Enter your email..."
										className="form-input"
										disabled={loading}
									/>
								</div>
							</div>
							<div className="form-col">
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
										placeholder="Choose a password..."
										className="form-input"
										disabled={loading}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="confirmPassword" className="form-label">
										Confirm Password
									</label>
									<input
										type="password"
										id="confirmPassword"
										name="confirmPassword"
										value={formData.confirmPassword}
										onChange={handleChange}
										required
										placeholder="Confirm your password..."
										className="form-input"
										disabled={loading}
									/>
								</div>
							</div>
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
							className="register-button"
						>
							{loading ? "Creating Account..." : "Create Account"}
						</Button>
					</form>
				</Card.Body>
				<Card.Footer>
					<div className="register-footer">
						<p className="footer-text">
							Already have an account?{" "}
							<Button
								type="button"
								variant="ghost"
								size="small"
								onClick={onSwitchToLogin}
								className="switch-button"
							>
								Sign In
							</Button>
						</p>
					</div>
				</Card.Footer>
			</Card>
		</div>
	);
}

export default RegisterFormV2;
