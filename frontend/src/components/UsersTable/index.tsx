import {
	Table,
	Divider,
	Form,
	Input,
	Typography,
	Popconfirm,
	notification,
	Skeleton,
	Empty,
} from "antd";
import {
	CheckOutlined,
	DeleteOutlined,
	EditOutlined,
	StopOutlined,
} from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import { IUser } from "../../interfaces/user";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import CreateUserModal from "../CreateUserModal";
import moment, { Moment } from "moment";
import MyDatePicker from "../DatePicker";
import { openNotificationWithIcon } from "../../tools/showNotification";
import { Rule } from "antd/es/form";
import {
	validateDocumentNumberInput,
	validateEmailInput,
} from "../../tools/formValidators";
import { PhoneNumbersForm } from "../PhoneNumbersForm";
import { AddressesForm } from "../AddressesForm";
import api from "../../providers/api";
import { errorHandler } from "../../tools/errorHandler";
import { normalizeDocumentNumber } from "../../tools/formNormalizers";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
	editing: boolean;
	dataIndex: string;
	rules: Rule[];
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
	rules,
	...restProps
}) => {
	const inputNode =
		inputType === "text" ? (
			dataIndex === "documentNumber" ? (
				<Form.Item
					style={{ margin: 0 }}
					name={dataIndex}
					rules={rules}
					normalize={normalizeDocumentNumber}
				>
					<Input />
				</Form.Item>
			) : (
				<Form.Item style={{ margin: 0 }} name={dataIndex} rules={rules}>
					<Input />
				</Form.Item>
			)
		) : (
			<Form.Item style={{ margin: 0 }} name={dataIndex} rules={rules}>
				<MyDatePicker disabledDate={disabledDate} />
			</Form.Item>
		);

	return <td {...restProps}>{editing ? inputNode : children}</td>;
};

export function UserTable() {
	const { apiKey, validApiKey } = useContext(ApiKeyContext);

	const [users, setUsers] = useState<IUser[] | []>([]);

	const [editingKey, setEditingKey] = useState("");

	const [form] = Form.useForm();

	const [loading, setLoading] = useState<boolean>(false);

	const isEditing = (record: IUser) => record._id === editingKey;

	const [notificationApi, contextHolder] = notification.useNotification();

	useEffect(() => {
		if (validApiKey) {
			setLoading(true);
			api.get("/users").then((response) => {
				if (response.status === 200) {
					setUsers(response.data.data);
				} else {
					setUsers([]);
				}
				setLoading(false);
			});
		} else {
			setUsers([]);
		}
	}, [validApiKey]);

	const cancel = () => {
		setEditingKey("");
	};
	const edit = (record: Partial<IUser>) => {
		const {
			dateOfBirth,
			email,
			documentNumber,
			firstName,
			lastName,
			addresses,
			phoneNumbers,
		} = record;

		form.setFieldsValue({
			dateOfBirth: dateOfBirth ? moment(dateOfBirth) : "",
			email: email?.trim() || "",
			documentNumber: documentNumber?.trim() || "",
			firstName: firstName || "",
			lastName: lastName || "",
			addresses: addresses || [],
			phoneNumbers: phoneNumbers || [],
		});
		setEditingKey(record._id ?? "");
	};

	const save = async (key: string) => {
		try {
			setLoading(true);
			const row = (await form.validateFields()) as IUser;
			row["dateOfBirth"] = moment(row.dateOfBirth).toISOString();

			form.validateFields().then(() => {
				api
					.put(`/users/${key}`, row)
					.then(() => {
						const updatedUser = [...users];
						const index = updatedUser.findIndex((item) => key === item._id);
						if (index > -1) {
							const item = updatedUser[index];
							updatedUser.splice(index, 1, {
								...item,
								...row,
							});
							setUsers(updatedUser);
						} else {
							updatedUser.push(row);
							setUsers(updatedUser);
						}
						openNotificationWithIcon(
							notificationApi,
							"success",
							"User edited successfully",
							"User edited successfully"
						);
						setEditingKey("");
					})
					.catch((error) => {
						throw error;
					})
					.finally(() => {
						setLoading(false);
					});
			});
		} catch (error) {
			setEditingKey("");
			errorHandler(error, notificationApi);
		}
	};

	const expandedRowRender = (row: IUser) => {
		const dataAddresses = row.addresses;

		const dataPhoneNumbers = row.phoneNumbers;
		return (
			<div style={{ padding: "0px 40px 20px 40px" }}>
				<PhoneNumbersForm phoneNumbers={dataPhoneNumbers} userId={row._id} />
				<Divider />
				<AddressesForm addresses={dataAddresses} userId={row._id} />
			</div>
		);
	};

	const deleteUser = (id: string) => {
		setLoading(true);
		api
			.delete(`/users/${id}`)
			.then((response) => {
				if (response.status === 204) {
					openNotificationWithIcon(
						notificationApi,
						"success",
						"User deleted successfully",
						"User deleted successfully"
					);
					api
						.get("/users")
						.then((response) => {
							if (response.status === 200) {
								setUsers(response.data.data);
							} else {
								setUsers([]);
							}
						})
						.finally(() => {
							setLoading(false);
						})
						.catch((error) => {
							throw error;
						});
				}
			})
			.catch((error) => {
				errorHandler(error, notificationApi);
			});
	};

	const columns = [
		{
			title: "ID",
			dataIndex: "_id",
			key: "id",
			sorter: (a: IUser, b: IUser) =>
				a._id.toString().localeCompare(b._id.toString()),
		},
		{
			title: "First Name",
			dataIndex: "firstName",
			key: "firstName",
			editable: true,
			rules: [
				{ required: true, message: "Please input the first name!" },
				{ max: 50, message: "Max 50 characters" },
			],
			sorter: (a: IUser, b: IUser) => a.firstName.localeCompare(b.firstName),
		},
		{
			title: "Last Name",
			dataIndex: "lastName",
			key: "lastName",
			editable: true,
			rules: [
				{
					required: true,
					message: "Please input the last name!",
					max: 50,
				},
				{ max: 50, message: "Max 50 characters" },
			],
			sorter: (a: IUser, b: IUser) => a.lastName.localeCompare(b.lastName),
		},
		{
			title: "Date of Birth",
			dataIndex: "dateOfBirth",
			key: "dateOfBirth",
			editable: true,
			rules: [{ required: true, message: "Please select the date of birth!" }],
			render: (text: string) => moment(text).format("YYYY/MM/DD"),
			sorter: (a: IUser, b: IUser) =>
				moment(a.dateOfBirth).valueOf() - moment(b.dateOfBirth).valueOf(),
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			editable: true,
			rules: [
				{ required: true, message: "Please input the email!" },
				{
					validator: validateEmailInput,
					message: "Invalid email input",
				},
			],
			sorter: (a: IUser, b: IUser) => a.email.localeCompare(b.email),
		},
		{
			title: "Document Number",
			dataIndex: "documentNumber",
			key: "documentNumber",
			editable: true,
			rules: [
				{ required: true, message: "Please input the document number!" },
				{
					validator: validateDocumentNumberInput,
					message: "Invalid document number input",
				},
			],
			sorter: (a: IUser, b: IUser) =>
				a.documentNumber.localeCompare(b.documentNumber),
		},
		{
			title: "Action",
			key: "operation",
			render: (_: any, record: IUser) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<Popconfirm title="Sure to cancel?" onConfirm={cancel}>
							<StopOutlined style={{ marginRight: 8 }} />
						</Popconfirm>

						<Typography.Link onClick={() => save(record._id)}>
							<CheckOutlined />
						</Typography.Link>
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
				rules: col.rules,
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
					scroll={{ x: 1000 }}
					rowKey={(record) => record._id}
					className="components-table-demo-nested"
					columns={mergedColumns}
					expandable={{ expandedRowRender }}
					dataSource={loading ? [] : users}
					locale={{
						emptyText: loading ? <Skeleton active={true} /> : <Empty />,
					}}
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
