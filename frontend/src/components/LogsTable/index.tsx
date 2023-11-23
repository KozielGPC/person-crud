import React from "react";

const LogsTable = ({ users }: any) => {
	return (
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Email</th>
					<th>Role</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user: any) => (
					<tr key={user.id}>
						<td>{user.id}</td>
						<td>{user.name}</td>
						<td>{user.email}</td>
						<td>{user.role}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default LogsTable;
