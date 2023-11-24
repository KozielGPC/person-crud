import { useContext } from "react";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import SubmitButton from "../SubmitButton";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";

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
		<Box>
			<Grid container spacing={3}>
				<Grid item xs>
					<form onSubmit={handleSubmitApiKey}>
						<Box display="flex" flexDirection="row">
							<TextField
								id="api-key"
								label="API KEY"
								variant="standard"
								onChange={handleApiKeyChange}
								value={apiKey}
							/>
							<Button
								type="submit"
								variant="outlined"
								color="primary"
								size="large"
								fullWidth={true}
								style={{ margin: "20px" }}
							>
								Submit
							</Button>
						</Box>
					</form>
				</Grid>
				<Grid item xs={6}></Grid>
				<Grid item xs>
					<h1>Valid Api Key: {validApiKey ? "true" : "false"}</h1>
				</Grid>
			</Grid>
		</Box>
	);
};
