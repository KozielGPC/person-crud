import React, { useState, useEffect } from "react";
import SubmitButton from "../../components/SubmitButton";
import UserTable from "../../components/UsersTable";
import LogsTable from "../../components/LogsTable";
import axios from "axios";

const UsersPage = () => {
	const [apiKey, setApiKey] = useState("");
	const [users, setUsers] = useState([]);
	const [validApiKey, setValidApiKey] = useState(false);

	useEffect(() => {}, []);
	// useEffect(() => {
	// 	if (apiKey) {
	// 		fetch("http://localhost:3000/users", {
	// 			headers: {
	// 				Authorization: `Bearer ${apiKey}`,
	// 			},
	// 		})
	// 			.then((response) => response.json())
	// 			.then((data) => setUsers(data));
	// 	}
	// }, [apiKey]);

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

			<UserTable
				users={[
					{
						id: 1,
						name: "John Doe",
						email: "nqXZt@example.com",
						role: "admin",
					},
				]}
			/>

			<LogsTable
				users={[
					{
						id: 1,
						name: "John Doe",
						email: "nqXZt@example.com",
						role: "admin",
					},
				]}
			/>
		</div>
	);
};

export default UsersPage;
