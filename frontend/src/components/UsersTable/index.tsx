import {
	Table,
	Divider,
	Form,
	Input,
	Typography,
	Popconfirm,
	notification,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IUser } from "../../interfaces/user";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import CreateUserModal from "../CreateUserModal";
import moment, { Moment } from "moment";
import MyDatePicker from "../DatePicker";
import { openNotificationWithIcon } from "../../tools/showNotification";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
	editing: boolean;
	dataIndex: string;
	title: any;
	inputType: "text" | "date";
	record: IUser;
	index: number;
	children: React.ReactNode;
}

const disabledDate = (current: Moment) => {
	return current && current > moment().endOf("day");
};
const EditableCell: React.FC<EditableCellProps> = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {
	const inputNode =
		inputType === "text" ? (
			<Form.Item
				style={{ margin: 0 }}
				name={dataIndex}
				rules={[
					{
						required: true,
						message: `Please Input ${title}!`,
					},
				]}
			>
				<Input />
			</Form.Item>
		) : (
			<Form.Item
				style={{ margin: 0 }}
				name={dataIndex}
				rules={[
					{
						required: true,
						message: `Please Input ${title}!`,
					},
				]}
			>
				<MyDatePicker disabledDate={disabledDate} />
			</Form.Item>
		);

	return <td {...restProps}>{editing ? inputNode : children}</td>;
};

export function UserTable() {
	const { apiKey, validApiKey } = useContext(ApiKeyContext);

	const [users, setUsers] = useState<IUser[] | []>([]);

	const [editingKey, setEditingKey] = useState("");

	const [data, setData] = useState<IUser | null>(null);

	const [form] = Form.useForm();
	const isEditing = (record: IUser) => record._id === editingKey;

	const [api, contextHolder] = notification.useNotification();

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

	const cancel = () => {
		setEditingKey("");
	};

	const edit = (record: Partial<IUser>) => {
		const { dateOfBirth, email, documentNumber, firstName, lastName } = record;
		console.log(dateOfBirth);

		form.setFieldsValue({
			dateOfBirth: dateOfBirth ? moment(dateOfBirth) : "",
			email: email || "",
			documentNumber: documentNumber || "",
			firstName: firstName || "",
			lastName: lastName || "",
		});
		setEditingKey(record._id ?? "");
	};

	const save = async (key: string) => {
		try {
			const row = (await form.validateFields()) as IUser;
			row["dateOfBirth"] = moment(row.dateOfBirth).toISOString();

			const updatedUser = [...users];
			const index = updatedUser.findIndex((item) => key === item._id);
			if (index > -1) {
				const item = updatedUser[index];
				updatedUser.splice(index, 1, {
					...item,
					...row,
				});
				setUsers(updatedUser);
				setEditingKey("");
			} else {
				updatedUser.push(row);
				setUsers(updatedUser);
				setEditingKey("");
			}

			openNotificationWithIcon(
				api,
				"success",
				"User edited successfully",
				"User edited successfully"
			);
		} catch (errInfo) {
			openNotificationWithIcon(
				api,
				"error",
				"Error editing user",
				"Something wrong occurred on editing user"
			);
		}
	};

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
			<div style={{ padding: "0px 40px 20px 40px" }}>
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
					openNotificationWithIcon(
						api,
						"success",
						"User deleted successfully",
						"User deleted successfully"
					);
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
			}).catch((error) => {
				openNotificationWithIcon(
					api,
					"error",
					"Error on deleting user",
					"Something wrong occurred on deleting user"
				);
			});
	};

	const columns = [
		{ title: "ID", dataIndex: "_id", key: "id" },
		{
			title: "First Name",
			dataIndex: "firstName",
			key: "firstName",
			editable: true,
		},
		{
			title: "Last Name",
			dataIndex: "lastName",
			key: "lastName",
			editable: true,
		},
		{
			title: "Date of Birth",
			dataIndex: "dateOfBirth",
			key: "dateOfBirth",
			editable: true,
		},
		{ title: "Email", dataIndex: "email", key: "email", editable: true },
		{
			title: "Document Number",
			dataIndex: "documentNumber",
			key: "documentNumber",
			editable: true,
		},
		{
			title: "Action",
			key: "operation",
			render: (_: any, record: IUser) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<Typography.Link
							onClick={() => save(record._id)}
							style={{ marginRight: 8 }}
						>
							Save
						</Typography.Link>
						<Popconfirm title="Sure to cancel?" onConfirm={cancel}>
							<a>Cancel</a>
						</Popconfirm>
					</span>
				) : (
					<span>
						<Typography.Link
							disabled={editingKey !== ""}
							onClick={() => edit(record)}
							style={{ marginRight: 8 }}
						>
							<EditOutlined />
						</Typography.Link>

						<Typography.Link
							disabled={editingKey !== ""}
							onClick={() => deleteUser(record._id)}
						>
							<DeleteOutlined />
						</Typography.Link>
					</span>
				);
			},
		},
	];

	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record: IUser) => ({
				record,
				inputType: col.dataIndex === "dateOfBirth" ? "date" : "text",
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});

	return (
		<>
			{contextHolder}
			<Form form={form} component={false}>
				<Table
					components={{
						body: {
							cell: EditableCell,
						},
					}}
					title={() => (
						<div>
							<h1>Users</h1>{" "}
							<CreateUserModal setUsers={setUsers} users={users} key={apiKey} />
						</div>
					)}
					rowKey={(record) => record._id}
					scroll={{ x: 1300 }}
					className="components-table-demo-nested"
					columns={mergedColumns}
					expandable={{ expandedRowRender }}
					dataSource={users}
					bordered
					rowClassName={(record, index) =>
						index % 2 === 0
							? "table-row-light editable-row"
							: "table-row-dark editable-row"
					}
				/>
			</Form>
		</>
	);
}
