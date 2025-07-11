import React from "react";
import "./Button.css";

const Button = ({
	children,
	variant = "primary",
	size = "medium",
	disabled = false,
	loading = false,
	fullWidth = false,
	onClick,
	type = "button",
	className = "",
	as: Component = "button",
	...props
}) => {
	const baseClass = "btn";
	const variantClass = `btn--${variant}`;
	const sizeClass = `btn--${size}`;
	const widthClass = fullWidth ? "btn--full-width" : "";
	const loadingClass = loading ? "btn--loading" : "";
	const disabledClass = disabled ? "btn--disabled" : "";

	const combinedClassName = [
		baseClass,
		variantClass,
		sizeClass,
		widthClass,
		loadingClass,
		disabledClass,
		className,
	]
		.filter(Boolean)
		.join(" ");

	const handleClick = (e) => {
		if (disabled || loading) {
			e.preventDefault();
			return;
		}
		onClick?.(e);
	};

	return (
		<Component
			type={Component === "button" ? type : undefined}
			className={combinedClassName}
			onClick={handleClick}
			disabled={disabled || loading}
			{...props}
		>
			{loading && (
				<span className="btn__loader">
					<svg className="btn__spinner" viewBox="0 0 24 24">
						<circle
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
							fill="none"
							strokeLinecap="round"
						/>
					</svg>
				</span>
			)}
			<span className="btn__content">{children}</span>
		</Component>
	);
};

export default Button;
