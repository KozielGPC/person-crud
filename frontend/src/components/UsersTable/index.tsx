import { Table, Divider } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IUser } from "../../interfaces/user";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import CreateUserModal from "../CreateUserModal";



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
			<div
				style={{ padding: "0px 40px 20px 40px", backgroundColor: "#aba9a9" }}
			>
				<Table
					title={() => <h1>Phone Numbers</h1>}
					columns={columnsPhoneNumber}
					dataSource={dataPhoneNumbers}
					pagination={false}
				/>
				<Divider />
				<Table
					title={() => <h1>Addresses</h1>}
					columns={columnsAddress}
					dataSource={dataAddresses}
					pagination={false}
				/>
			</div>
		);
	};

	const deleteUser = (id: string) => {
		axios
			.delete(`http://localhost:3001/users/${id}`, {
				headers: {
					"x-api-key": apiKey,
				},
			})
			.then((response) => {
				if (response.status === 200) {
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
				}
			});
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
		{
			title: "Action",
			key: "operation",
			render: (row: IUser) => (
				<div>
					<a>
						<EditOutlined />
					</a>{" "}
					<a style={{ marginLeft: 12 }}>
						<DeleteOutlined onClick={() => deleteUser(row._id)} />
					</a>{" "}
				</div>
			),
		},
	];

	return (
		<Table
			title={() => (
				<div>
					<h1>Users</h1> <CreateUserModal />
				</div>
			)}
			rowKey={(record) => record._id}
			scroll={{ x: 1300 }}
			className="components-table-demo-nested"
			columns={columns}
			expandable={{ expandedRowRender }}
			dataSource={users}
		/>
	);
}
