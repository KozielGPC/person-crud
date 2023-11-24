import React, { useState, useEffect } from "react";
import SubmitButton from "../../components/SubmitButton";
import UserTable from "../../components/UsersTable";
import LogsTable from "../../components/LogsTable";
import axios from "axios";
import { IUser } from "../../interfaces/user";
import { ILog } from "../../interfaces/log";

const UsersPage = () => {
	const [apiKey, setApiKey] = useState("");
	const [users, setUsers] = useState<IUser[] | []>([]);
	const [logs, setLogs] = useState<ILog[] | []>([]);
	const [validApiKey, setValidApiKey] = useState(false);

	useEffect(() => {
		if (validApiKey) {
			axios
				.get("http://localhost:3001/users", {
					headers: {
						"x-api-key": apiKey,
					},
				})
				.then((response) => {
					if (response.status === 200) {
						setUsers(response.data.data);
					} else {
						setUsers([]);
					}
				});
		} else {
			setUsers([]);
		}
	}, [validApiKey]);

	useEffect(() => {
		if (validApiKey) {
			axios
				.get("http://localhost:3001/logs", {
					headers: {
						"x-api-key": apiKey,
					},
				})
				.then((response) => {
					if (response.status === 200) {
						setLogs(response.data.data);
					} else {
						setLogs([]);
					}
				});
		} else {
			setLogs([]);
		}
	}, [validApiKey]);

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

			<UserTable users={users} />

			<LogsTable
				logs={logs}
			/>
		</div>
	);
};

export default UsersPage;
