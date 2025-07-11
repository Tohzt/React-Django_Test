import React from "react";
import "./Card.css";

const Card = ({ children, className = "", ...props }) => {
	return (
		<div className={`card ${className}`} {...props}>
			<div className="card__background">{children}</div>
		</div>
	);
};

// Card Header Component
Card.Header = ({ children, className = "", ...props }) => (
	<div className={`card__header ${className}`} {...props}>
		{children}
	</div>
);

// Card Body Component
Card.Body = ({ children, className = "", ...props }) => (
	<div className={`card__body ${className}`} {...props}>
		{children}
	</div>
);

// Card Footer Component
Card.Footer = ({ children, className = "", ...props }) => (
	<div className={`card__footer ${className}`} {...props}>
		{children}
	</div>
);

// Card Image Component
Card.Image = ({ src, alt, className = "", ...props }) => (
	<div className={`card__image ${className}`} {...props}>
		<img src={src} alt={alt} />
	</div>
);

export default Card;
