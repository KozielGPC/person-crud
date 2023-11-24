import React from "react";
// import Button from "@mui/material/Button";
import { Button } from "antd";

const SubmitButton = ({ label }: { label: string }) => {
	return (
		// <Button type="submit" variant="outlined" color="primary">
		<Button>
			{label}
		</Button>
	);
};

export default SubmitButton;
