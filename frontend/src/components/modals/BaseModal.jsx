import React from "react";
import { Button } from "../ui";
import "./BaseModal.css";

function BaseModal({ isOpen, onClose, children }) {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<Button
					variant="ghost"
					size="small"
					onClick={onClose}
					className="close-modal-btn"
					title="Close"
				>
					&times;
				</Button>
				{children}
			</div>
		</div>
	);
}

export default BaseModal;
