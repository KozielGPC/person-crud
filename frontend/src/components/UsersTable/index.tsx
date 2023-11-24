import React from "react";
import { IUser } from "../../interfaces/user";

const UserTable = ({ users }: { users: IUser[] }) => {
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
