import {
	Table,
	Divider,
	Form,
	Input,
	Typography,
	Popconfirm,
	notification,
	Button,
} from "antd";
import {
	CheckOutlined,
	DeleteOutlined,
	EditOutlined,
	StopOutlined,
} from "@ant-design/icons";
import axios from "axios";
import React, { useContext, useState } from "react";
import { IPhoneNumber, IUser } from "../../interfaces/user";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import { openNotificationWithIcon } from "../../tools/showNotification";
import { Rule } from "antd/es/form";
import {
	validatePhoneNumberInput,
} from "../../tools/formValidators";
import mongoose from "mongoose";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
	editing: boolean;
	dataIndex: string;
	rules: Rule[];
	title: any;
	inputType: "text";
	record: IPhoneNumber;
	index: number;
	children: React.ReactNode;
}

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
	const inputNode = (
		<Form.Item style={{ margin: 0 }} name={dataIndex} rules={rules}>
			<Input />
		</Form.Item>
	);

	return <td {...restProps}>{editing ? inputNode : children}</td>;
};

export function PhoneNumberTable(props: {
	phoneNumbers: IPhoneNumber[];
	userId: string;
}) {
	const { apiKey } = useContext(ApiKeyContext);

	const [phoneNumbers, setPhoneNumbers] = useState<IPhoneNumber[]>(
		props.phoneNumbers
	);

	const [editingKey, setEditingKey] = useState("");

	const [form] = Form.useForm();

	const isEditing = (record: IPhoneNumber) =>
		record._id.toString() === editingKey;

	const [api, contextHolder] = notification.useNotification();

	const addPhoneNumber = () => {
		const newPhoneNumber: IPhoneNumber = {
			_id: new mongoose.Types.ObjectId(),
			number: "",
			type: "",
		};

		setPhoneNumbers([...phoneNumbers, newPhoneNumber]);
		setEditingKey(newPhoneNumber._id.toString());
	};

	const cancel = () => {
		setEditingKey("");
	};

	const edit = (record: Partial<IPhoneNumber>) => {
		const { number, type, _id } = record;

		form.setFieldsValue({
			_id: _id || new mongoose.Types.ObjectId(),
			number: number?.trim() || "",
			type: type || "",
		});
		setEditingKey(record._id?.toString() ?? "");
	};

	const save = async (key: mongoose.Types.ObjectId) => {
		try {
			const row: IPhoneNumber = (await form.validateFields()) as IPhoneNumber;
			console.log("row", row);

			console.log("key", key);

			const index = phoneNumbers.findIndex((item) => key === item._id);
			console.log("save antes", phoneNumbers);

			console.log("index", index);

			if (index > -1) {
				const item = phoneNumbers[index];
				console.log("item", item);

				item.number = row.number;
				item.type = row.type;
				phoneNumbers[index] = item;

				console.log("item after ", item);

				setPhoneNumbers(phoneNumbers);
			} else {
				console.log("entrou  no else");

				phoneNumbers.push(row);
				setPhoneNumbers(phoneNumbers);
			}

			console.log("save despues", phoneNumbers);

			form.validateFields().then(() => {
				axios
					.put(
						`http://localhost:3001/users/${props.userId}/phoneNumbers`,
						{ phoneNumbers: phoneNumbers },
						{
							headers: {
								"x-api-key": apiKey,
							},
						}
					)
					.then((response) => {
						if (response.status === 200) {
							openNotificationWithIcon(
								api,
								"success",
								"Phone Number added successfully",
								"Phone Number added successfully"
							);
						}
					})
					.catch((error) => {
						setPhoneNumbers(phoneNumbers.filter((item) => item._id !== key));
						openNotificationWithIcon(
							api,
							"error",
							"Error editing user",
							error?.response?.data?.message ??
								"Something wrong occurred on editing user"
						);
					});
			});

			setEditingKey("");
		} catch (errInfo) {
			openNotificationWithIcon(
				api,
				"error",
				"Error editing user",
				"Something wrong occurred on editing user"
			);
		}
	};

	const deletePhoneNumber = (key: mongoose.Types.ObjectId) => {
		axios
			.put(
				`http://localhost:3001/users/${props.userId}/phoneNumbers`,
				{
					phoneNumbers: phoneNumbers.filter((item) => item._id !== key),
				},
				{
					headers: {
						"x-api-key": apiKey,
					},
				}
			)
			.then((response) => {
				if (response.status === 200) {
					openNotificationWithIcon(
						api,
						"success",
						"Phone Number deleted successfully",
						"Phone Number deleted successfully"
					);
					setPhoneNumbers(phoneNumbers.filter((item) => item._id !== key));
				}
			})
			.catch((error) => {
				openNotificationWithIcon(
					api,
					"error",
					"Error on deleting Phone Number",
					"Something wrong occurred on deleting Phone Number"
				);
			});
	};

	const columns = [
		{
			title: "Number",
			dataIndex: "number",
			key: "number",
			editable: true,
			rules: [
				{
					required: true,
					message: "Please input the phone number!",
				},
				{
					validator: validatePhoneNumberInput,
					message: "Invalid phone number input",
				},
			],
		},
		{
			title: "Type",
			dataIndex: "type",
			key: "type",
			editable: true,
			rules: [
				{
					required: true,
					message: "Please select the phone type!",
				},
			],
		},
		{
			title: "Action",
			key: "operation",
			render: (_: any, record: IPhoneNumber) => {
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
							onClick={() => deletePhoneNumber(record._id)}
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
			onCell: (record: IPhoneNumber) => ({
				record,
				inputType: "text",
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
							<h1>Phone Numbers</h1>
						</div>
					)}
					rowKey={(record) => record._id.toString()}
					scroll={{ x: 1300 }}
					className="components-table-demo-nested"
					columns={mergedColumns}
					dataSource={phoneNumbers}
					pagination={false}
					bordered
					footer={() => (
						<Button
							type="primary"
							style={{ marginBottom: 16 }}
							onClick={addPhoneNumber}
						>
							Add Row
						</Button>
					)}
				/>
			</Form>
		</>
	);
}
