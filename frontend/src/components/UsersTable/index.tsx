import { Table, Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IUser } from "../../interfaces/user";
import { ApiKeyContext } from "../../context/ApiKeyContext";

export function UserTable() {
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

	const expandedRowRender = (row: IUser) => {
		const columnsPhoneNumber = [
			{ title: "Number", dataIndex: "number", key: "number" },
			{ title: "Type", dataIndex: "type", key: "type" },
			{
				title: "Action",
				dataIndex: "operation",
				key: "operation",
				render: () => (
					<span className="table-operation">
						<a>Pause</a>
						<a>Stop</a>
					</span>
				),
			},
		];

		const columnsAddress = [
			{ title: "Street", dataIndex: "street", key: "street" },
			{ title: "City", dataIndex: "city", key: "city" },
			{ title: "State", dataIndex: "state", key: "state" },
			{ title: "Zip Code", dataIndex: "zipCode", key: "zipCode" },
			{
				title: "Action",
				dataIndex: "operation",
				key: "operation",
				render: () => (
					<span className="table-operation">
						<a>Pause</a>
						<a>Stop</a>
					</span>
				),
			},
		];

		const dataAddresses = row.addresses;

		const dataPhoneNumbers = row.phoneNumbers;

		return (
			<div>
				<h1>Phone Numbers</h1>
				<Table
					columns={columnsPhoneNumber}
					dataSource={dataPhoneNumbers}
					pagination={false}
				/>
				<Divider />
				<h1>Addresses</h1>
				<Table
					columns={columnsAddress}
					dataSource={dataAddresses}
					pagination={false}
				/>
				;
			</div>
		);
	};

	const columns = [
		{ title: "ID", dataIndex: "_id", key: "id" },
		{ title: "First Name", dataIndex: "firstName", key: "firstName" },
		{ title: "Last Name", dataIndex: "lastName", key: "lastName" },
		{ title: "Date of Birth", dataIndex: "dateOfBirth", key: "dateOfBirth" },
		{ title: "Email", dataIndex: "email", key: "email" },
		{
			title: "Document Number",
			dataIndex: "documentNumber",
			key: "documentNumber",
		},
		{ title: "Action", key: "operation", render: () => <a>Publish</a> },
	];

	return (
		<Table
			scroll={{ x: 1300 }}
			className="components-table-demo-nested"
			columns={columns}
			expandable={{ expandedRowRender }}
			dataSource={users}
		/>
	);
}
