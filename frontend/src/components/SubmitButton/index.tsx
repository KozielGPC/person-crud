import React from "react";

const SubmitButton = ({
	label,
	onClick,
}: {
	label: string;
	onClick: () => void;
}) => {
    const buttonStyle = {
        backgroundColor: '#4CAF50', // Green background color
        color: 'white',            // White text color
        padding: '10px 15px',      // Padding around the text
        border: 'none',            // No border
        borderRadius: '5px',       // Rounded corners
        cursor: 'pointer',         // Cursor style on hover
      };

	return (
		<button type="submit" onClick={onClick} style={buttonStyle}>
			{label}
		</button>
	);
};

export default SubmitButton;
