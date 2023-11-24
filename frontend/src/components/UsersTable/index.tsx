import React, { useContext, useEffect, useState } from "react";
import { IUser } from "../../interfaces/user";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import axios from "axios";

const UserTable = () => {
	const { apiKey, validApiKey } = useContext(ApiKeyContext);

	const [users, setUsers] = useState<IUser[] | []>([]);

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

	return (
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
					<th>Date of Birth</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => (
					<tr key={user._id}>
						<td>{user._id}</td>
						<td>{user.firstName}</td>
						<td>{user.lastName}</td>
						<td>{user.email}</td>
						<td>{user.dateOfBirth}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default UserTable;
