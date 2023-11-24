import React, {  useContext } from "react";
import SubmitButton from "../../components/SubmitButton";
import UserTable from "../../components/UsersTable";
import LogsTable from "../../components/LogsTable";
import axios from "axios";
import { ApiKeyContext } from "../../context/ApiKeyContext";

const UsersPage = () => {
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
			<h2>Users</h2>

			<form onSubmit={handleSubmitApiKey}>
				<label>API Key</label>
				<input type="text" value={apiKey} onChange={handleApiKeyChange} />
				<SubmitButton label={"Submit"} />
			</form>

			<h1>Valid Api Key: {validApiKey ? "true" : "false"}</h1>

			<UserTable />

			<LogsTable />
		</div>
	);
};

export default UsersPage;
