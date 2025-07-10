import { useState } from "react";

function RegisterForm({ onRegisterSuccess, onSwitchToLogin }) {
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
			const response = await fetch("http://localhost:8000/api/auth/register/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: formData.username,
					email: formData.email,
					password: formData.password,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Registration failed");
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
			if (onRegisterSuccess) {
				onRegisterSuccess(data);
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="auth-form-container">
			<h2>Register</h2>
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
						placeholder="Choose a username..."
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
						placeholder="Enter your email..."
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
						placeholder="Choose a password..."
					/>
				</div>
				<div className="form-group">
					<label htmlFor="confirmPassword">Confirm Password:</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleChange}
						required
						placeholder="Confirm your password..."
					/>
				</div>
				{error && <div className="error-message">{error}</div>}
				<button className="auth-button" type="submit" disabled={loading}>
					{loading ? "Creating account..." : "Register"}
				</button>
			</form>
			<div className="auth-switch">
				<p>
					Already have an account?{" "}
					<button
						type="button"
						className="link-button"
						onClick={onSwitchToLogin}
					>
						Login here
					</button>
				</p>
			</div>
		</div>
	);
}

export default RegisterForm;
