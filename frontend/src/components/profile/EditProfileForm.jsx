import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import "./EditProfileForm.css";

function EditProfileForm({ profile, onEditSuccess, onCancel }) {
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		bio: "",
		website: "",
		location: "",
		birth_date: "",
	});
	const [avatar, setAvatar] = useState(null);
	const [removeAvatar, setRemoveAvatar] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [showMenu, setShowMenu] = useState(false);
	const avatarInputRef = useRef(null);
	const menuRef = useRef(null);
	const { getAuthHeaders } = useAuth();

	// Initialize form with current profile data
	useEffect(() => {
		if (profile) {
			setFormData({
				first_name: profile.first_name || "",
				last_name: profile.last_name || "",
				email: profile.email || "",
				bio: profile.bio || "",
				website: profile.website || "",
				location: profile.location || "",
				birth_date: profile.birth_date || "",
			});
		}
	}, [profile]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
		setError(""); // Clear error when user starts typing
	};

	// Create preview URL for selected avatar
	const getAvatarPreview = () => {
		if (avatar) {
			return URL.createObjectURL(avatar);
		}
		if (removeAvatar) {
			return "/src/default_profile.png";
		}
		return profile.avatar
			? `http://localhost:8000${profile.avatar}`
			: "/src/default_profile.png";
	};

	// Cleanup object URL when component unmounts or avatar changes
	useEffect(() => {
		return () => {
			if (avatar) {
				URL.revokeObjectURL(getAvatarPreview());
			}
		};
	}, [avatar]);

	// Handle outside click for menu
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};
		if (showMenu) {
			document.addEventListener("mousedown", handleClickOutside);
			return () =>
				document.removeEventListener("mousedown", handleClickOutside);
		}
	}, [showMenu]);

	const handleAvatarClick = (e) => {
		e.preventDefault();
		setShowMenu((prev) => !prev);
	};

	const handleMenuUpload = () => {
		setShowMenu(false);
		if (avatarInputRef.current) {
			avatarInputRef.current.value = null;
			avatarInputRef.current.click();
		}
	};

	const handleMenuRemove = () => {
		setShowMenu(false);
		setAvatar(null);
		setRemoveAvatar(true);
	};

	const handleAvatarChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			// Validate file type
			if (!file.type.startsWith("image/")) {
				setError("Please select an image file");
				return;
			}
			// Validate file size (max 5MB)
			if (file.size > 5 * 1024 * 1024) {
				setError("Image size must be less than 5MB");
				return;
			}
			setAvatar(file);
			setRemoveAvatar(false);
			setError("");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const formDataToSend = new FormData();

			// Add form fields
			Object.keys(formData).forEach((key) => {
				if (formData[key]) {
					formDataToSend.append(key, formData[key]);
				}
			});

			// Add avatar if selected
			if (avatar) {
				formDataToSend.append("avatar", avatar);
			}
			// Append empty string for avatar if removing
			if (removeAvatar) {
				formDataToSend.append("avatar", "");
			}

			const response = await fetch("http://localhost:8000/api/profiles/me/", {
				method: "PUT",
				headers: {
					...getAuthHeaders(),
					// Don't set Content-Type for FormData, let browser set it
				},
				body: formDataToSend,
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to update profile");
			}

			// Show toast
			// setShowToast(true); // Removed as per new_code
			// setTimeout(() => setShowToast(false), 2000); // Removed as per new_code

			// Call the success callback
			if (onEditSuccess) {
				onEditSuccess(data);
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	if (!profile) return null;

	return (
		<div className="edit-profile-modal">
			{/* Removed showToast as per new_code */}
			<div className="edit-profile-content">
				<h3>Edit Profile</h3>
				<form className="edit-profile-form" onSubmit={handleSubmit}>
					<div className="form-group" style={{ alignItems: "center" }}>
						<label style={{ marginBottom: 8 }}>Profile Picture:</label>
						<div style={{ position: "relative" }}>
							<img
								src={getAvatarPreview()}
								alt="Avatar preview"
								className="avatar-preview"
								onClick={handleAvatarClick}
								style={{
									cursor: "pointer",
									border: showMenu ? "2px solid #764ba2" : undefined,
								}}
							/>
							{showMenu && (
								<div
									ref={menuRef}
									className="avatar-menu"
									style={{
										position: "absolute",
										top: "100%",
										left: "50%",
										transform: "translateX(-50%)",
										background: "#fff",
										border: "1px solid #e1e5e9",
										borderRadius: 8,
										boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
										zIndex: 10,
										minWidth: 180,
										padding: 0,
									}}
								>
									<button
										type="button"
										className="avatar-menu-item"
										onClick={handleMenuUpload}
										style={{
											width: "100%",
											padding: "12px 20px",
											background: "none",
											border: "none",
											textAlign: "center",
											cursor: "pointer",
											fontSize: 16,
											color: "#333",
										}}
									>
										Upload Avatar
									</button>
									<button
										type="button"
										className="avatar-menu-item"
										onClick={handleMenuRemove}
										style={{
											width: "100%",
											padding: "12px 20px",
											background: "none",
											border: "none",
											textAlign: "center",
											cursor: "pointer",
											color: "#d32f2f",
											fontSize: 16,
										}}
									>
										Remove Avatar
									</button>
								</div>
							)}
							<input
								type="file"
								accept="image/*"
								ref={avatarInputRef}
								onChange={handleAvatarChange}
								style={{ display: "none" }}
							/>
						</div>
					</div>

					<div className="form-row">
						<div className="form-group">
							<label htmlFor="first_name">First Name:</label>
							<input
								type="text"
								id="first_name"
								name="first_name"
								value={formData.first_name}
								onChange={handleChange}
								placeholder="Enter your first name..."
							/>
						</div>
						<div className="form-group">
							<label htmlFor="last_name">Last Name:</label>
							<input
								type="text"
								id="last_name"
								name="last_name"
								value={formData.last_name}
								onChange={handleChange}
								placeholder="Enter your last name..."
							/>
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Enter your email..."
						/>
					</div>

					<div className="form-group">
						<label htmlFor="bio">Bio:</label>
						<textarea
							id="bio"
							name="bio"
							value={formData.bio}
							onChange={handleChange}
							placeholder="Tell us about yourself..."
							rows="4"
							maxLength="500"
						/>
						<small className="char-count">
							{formData.bio.length}/500 characters
						</small>
					</div>

					<div className="form-row">
						<div className="form-group">
							<label htmlFor="website">Website:</label>
							<input
								type="url"
								id="website"
								name="website"
								value={formData.website}
								onChange={handleChange}
								placeholder="https://example.com"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="location">Location:</label>
							<input
								type="text"
								id="location"
								name="location"
								value={formData.location}
								onChange={handleChange}
								placeholder="City, Country"
							/>
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="birth_date">Birth Date:</label>
						<input
							type="date"
							id="birth_date"
							name="birth_date"
							value={formData.birth_date}
							onChange={handleChange}
						/>
					</div>

					{error && <div className="error-message">{error}</div>}

					<div className="edit-actions">
						<button
							type="button"
							className="cancel-button"
							onClick={onCancel}
							disabled={loading}
						>
							Cancel
						</button>
						<button className="save-button" type="submit" disabled={loading}>
							{loading ? "Saving..." : "Save Changes"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default EditProfileForm;
