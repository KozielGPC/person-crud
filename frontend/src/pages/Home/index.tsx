import React, { useState, useEffect } from "react";
import SubmitButton from "../../components/SubmitButton";
import UserTable from "../../components/UsersTable";
import LogsTable from "../../components/LogsTable";

const UsersPage = () => {
	const [apiKey, setApiKey] = useState("");
	const [users, setUsers] = useState([]);

	useEffect(() => {
		if (apiKey) {
			fetch("http://localhost:3000/users", {
				headers: {
					Authorization: `Bearer ${apiKey}`,
				},
			})
				.then((response) => response.json())
				.then((data) => setUsers(data));
		}
	}, [apiKey]);

	const handleApiKeyChange = (event: any) => {
		setApiKey(event.target.value);
	};

	const handleSubmit = () => {
		// fetch("http://localhost:3000/users", {
		// 	method: "GET",
		// 	headers: {
		// 		Authorization: `Bearer ${apiKey}`,
		// 		"Content-Type": "application/json",
		// 	},
		// })
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		setUsers(data);
		// 	});
	};

	return (
		<div>
			<h2>Users</h2>

			<form>
				<label>API Key</label>
				<input type="text" value={apiKey} onChange={handleApiKeyChange} />
				<SubmitButton label={"Submit"} onClick={handleSubmit} />
			</form>

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
