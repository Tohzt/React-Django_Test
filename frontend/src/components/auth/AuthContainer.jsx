import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useAuth } from "../../context/AuthContext";
import "./AuthContainer.css";

function AuthContainer() {
	const [isLogin, setIsLogin] = useState(true);
	const { login } = useAuth();

	const handleLoginSuccess = (userData) => {
		login(userData);
	};

	const handleRegisterSuccess = (userData) => {
		login(userData);
	};

	const switchToRegister = () => {
		setIsLogin(false);
	};

	const switchToLogin = () => {
		setIsLogin(true);
	};

	return (
		<div className="auth-container">
			{isLogin ? (
				<LoginForm
					onLoginSuccess={handleLoginSuccess}
					onSwitchToRegister={switchToRegister}
				/>
			) : (
				<RegisterForm
					onRegisterSuccess={handleRegisterSuccess}
					onSwitchToLogin={switchToLogin}
				/>
			)}
		</div>
	);
}

export default AuthContainer;
