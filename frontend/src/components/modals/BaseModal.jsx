import React from "react";
import "./BaseModal.css";

function BaseModal({ isOpen, onClose, children }) {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button className="close-modal-btn" onClick={onClose}>
					&times;
				</button>
				{children}
			</div>
		</div>
	);
}

export default BaseModal;
