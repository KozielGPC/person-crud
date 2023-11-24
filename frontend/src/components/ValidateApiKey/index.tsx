import { useContext } from "react";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import SubmitButton from "../SubmitButton";
import axios from "axios";
import TextField from "@mui/material/TextField";

export const ApiKeyValidatorContainer = () => {
	const { apiKey, setApiKey, validApiKey, setValidApiKey } =
		useContext(ApiKeyContext);

	const handleApiKeyChange = (event: any) => {
		setApiKey(event.target.value);
	};

	const handleSubmitApiKey = async (e: any) => {
		e.preventDefault();
		const { data, status } = await axios.get(
			"http://localhost:3001/validate-api-key",
			{
				params: {
					apiKey: apiKey,
				},
			}
		);
		if (status === 200 && data.data.isValid) {
			setValidApiKey(true);
		} else {
			setValidApiKey(false);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmitApiKey}>
				<TextField
					id="api-key"
					label="API KEY"
					variant="standard"
					onChange={handleApiKeyChange}
					value={apiKey}
				/>
				<SubmitButton label={"Submit"} />
			</form>

			<h1>Valid Api Key: {validApiKey ? "true" : "false"}</h1>
		</div>
	);
};
