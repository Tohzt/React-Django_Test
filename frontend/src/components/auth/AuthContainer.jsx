import { useState } from "react";
import LoginFormV2 from "./LoginFormV2";
import RegisterFormV2 from "./RegisterFormV2";
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
				<LoginFormV2
					onLoginSuccess={handleLoginSuccess}
					onSwitchToRegister={switchToRegister}
				/>
			) : (
				<RegisterFormV2
					onRegisterSuccess={handleRegisterSuccess}
					onSwitchToLogin={switchToLogin}
				/>
			)}
		</div>
	);
}

export default AuthContainer;
