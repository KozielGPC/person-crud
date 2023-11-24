import React from "react";
import Button from "@mui/material/Button";

const SubmitButton = ({ label }: { label: string }) => {
	return (
		<Button type="submit" variant="outlined" color="primary">
			{label}
		</Button>
	);
};

export default SubmitButton;
