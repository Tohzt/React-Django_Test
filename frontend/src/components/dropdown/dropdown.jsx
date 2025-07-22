"use client";
import { useState } from "react";
import { Button } from "../ui";
import "./dropdown.css";

function Dropdown() {
	const [open, setOpen] = useState(false);
	const [btnName, setBtnName] = useState("Select From Dropdown");
	const entries = [
		{ name: "first", value: 1 },
		{ name: "second", value: 2 },
		{ name: "third", value: 3 },
	];

	const handleDropdown = async (e) => {
		setOpen(!open);
	};

	return (
		<div className="dropdown-container">
			<div
				style={{ display: "flex", "flex-direction": "column" }}
				onClick={handleDropdown}
			>
				{btnName}
			</div>
			{open && (
				<div className="dropdown-drawer">
					{entries.map((e) => (
						<div className="dropdown-option">
							<Button
								onClick={() => {
									setBtnName(e.value);
								}}
							>
								{e.name}
							</Button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default Dropdown;
