import {
	Form,
	Input,
	notification,
	Button,
	Select,
	Space,
	Layout,
	Card,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IPhoneNumber } from "../../interfaces/user";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import { openNotificationWithIcon } from "../../tools/showNotification";
import { validatePhoneNumberInput } from "../../tools/formValidators";

const FieldComponent = ({
	index,
	name,
	remove,
	field,
	setHasInputsChanged,
	disabled = false,
}: {
	index?: number;
	name?: string;
	remove?: (index: number) => void | undefined;
	setHasInputsChanged: (e: boolean) => void | undefined;
	phoneNumbers?: IPhoneNumber[];
	field?: IPhoneNumber;
	disabled?: boolean;
}) => {
	const typeOptions = [
		{
			label: "home",
			value: "home",
		},
		{
			label: "work",
			value: "work",
		},
		{
			label: "personal",
			value: "personal",
		},
	];

	const formItemName = {
		number:
			index !== undefined
				? [`${index}`, "number"]
				: name
				? [name, "number"]
				: "number",
		type:
			index !== undefined
				? [`${index}`, "type"]
				: name
				? [name, "type"]
				: "type",
	};

	const formItemRules = {
		type: [
			{
				required: true,
				message: "Please select the phone type!",
			},
		],
		number: [
			{
				required: true,
				message: "Please input the phone number!",
			},
			{
				validator: validatePhoneNumberInput,
				message: "Invalid phone number input",
			},
		],
	};
	return (
		<Space key={index} align="baseline">
			<div>
				<Form.Item
					preserve={true}
					label="type"
					initialValue={field?.type ?? "home"}
					name={formItemName["type"]}
					rules={formItemRules["type"]}
				>
					<Select
						style={{ width: 220 }}
						options={typeOptions}
						disabled={disabled}
					/>
				</Form.Item>
				<Form.Item
					preserve={true}
					label="number"
					initialValue={field?.number ?? ""}
					name={formItemName["number"]}
					rules={formItemRules["number"]}
				>
					<Input
						disabled={disabled}
						placeholder="(44) 1234-1234 or (44) 91234-1234"
					/>
				</Form.Item>
			</div>
			{remove && index !== undefined ? (
				<MinusCircleOutlined
					style={{ color: "#E34444" }}
					onClick={() => {
						remove(index);
						setHasInputsChanged(true);
					}}
				/>
			) : (
				<></>
			)}
		</Space>
	);
};

export const PhoneNumbersForm = (props: {
	phoneNumbers: IPhoneNumber[];
	userId: string;
}) => {
	const { apiKey } = useContext(ApiKeyContext);
	const [api, contextHolder] = notification.useNotification();

	const [hasInputsChanged, setHasInputsChanged] = useState<boolean>(false);
	const [form] = Form.useForm();
	const [dynamicFields, setDynamicFields] = useState<
		{
			index: number;
			field?: IPhoneNumber | undefined;
		}[]
	>([]);

	useEffect(() => {
		setDynamicFields(
			props.phoneNumbers.map((field, index) => ({
				index: index + 1,
				field,
			})) ?? []
		);
	}, [props.phoneNumbers]);

	const add = () =>
		setDynamicFields((prev) => [
			...prev,
			prev.length >= 1
				? { index: prev[prev.length - 1].index + 1 }
				: { index: prev.length + 1 },
		]);

	const remove = (index: number) =>
		setDynamicFields((prev) => prev.filter((num) => num.index !== index));

	const onFinish = (values: { phoneNumbers: IPhoneNumber[] }) => {
		const input = Object.values(values.phoneNumbers).filter(
			(value) => value.number != "" && value.type != ""
		);
		try {
			axios
				.put(
					`http://localhost:3001/users/${props.userId}/phoneNumbers`,
					{ phoneNumbers: input },
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
				.finally(() => {
					setHasInputsChanged(false);
				})
				.catch((error) => {
					openNotificationWithIcon(
						api,
						"error",
						"Error editing user",
						error?.response?.data?.message ??
							"Something wrong occurred on editing user"
					);
				});
		} catch (errInfo) {
			openNotificationWithIcon(
				api,
				"error",
				"Error editing user",
				"Something wrong occurred on editing user"
			);
		}
	};

	return (
		<>
			{contextHolder}
			<Layout className="phone_numbers_container">
				<Layout style={{ padding: "24px" }}>
					<Card title="Phone Numbers" style={{ marginBottom: "24px" }}>
						<Form
							form={form}
							name="dynamic_form_phone_number"
							onFinish={onFinish}
							autoComplete="off"
							onFieldsChange={() => {
								setHasInputsChanged(true);
							}}
							preserve={false}
						>
							<Form.List name="phoneNumbers">
								{() =>
									dynamicFields.map((field) => (
										<FieldComponent
											key={field.index}
											index={field.index}
											field={field.field}
											remove={remove}
											setHasInputsChanged={setHasInputsChanged}
											phoneNumbers={props.phoneNumbers}
										/>
									))
								}
							</Form.List>
							<Form.Item>
								<Button
									type="dashed"
									onClick={() => {
										add();
										setHasInputsChanged(true);
									}}
									block
									icon={<PlusOutlined />}
								>
									New Phone Number
								</Button>
							</Form.Item>
						</Form>
					</Card>
				</Layout>
				<Button
					type="primary"
					disabled={!hasInputsChanged}
					onClick={() => form.submit()}
				>
					Save
				</Button>
			</Layout>
		</>
	);
};
