import React, { useContext, useState } from "react";
import {
	Form,
	Input,
	Button,
	DatePicker,
	Select,
	Modal,
	notification,
} from "antd";
import axios from "axios";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import moment from "moment";
import type { RangePickerProps } from "antd/es/date-picker";
import { validateCEP, validateCPF, validateEmail, validatePhoneNumber } from "../../tools/utils";

const { Option } = Select;

type NotificationType = "success" | "error";

const CreateUserModal = () => {
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);

	const { apiKey, validApiKey } = useContext(ApiKeyContext);

	const [form] = Form.useForm();

	const [api, contextHolder] = notification.useNotification();

	const openNotificationWithIcon = (
		type: NotificationType,
		message?: string,
		description?: string
	) => {
		api[type]({
			message: message,
			description: description,
		});
	};

	const validateEmailInput = (rule: any, value: string) => {
		if (!validateEmail(value)) {
			return Promise.reject("Invalid email input");
		}
		return Promise.resolve();
	};

    const validatePhoneNumberInput = (rule: any, value: string) => {
		if (!validatePhoneNumber(value)) {
			return Promise.reject("Invalid phone number input");
		}
		return Promise.resolve();
	};

    const validateZipCodeInput = (rule: any, value: string) => {
		if (!validateCEP(value)) {
			return Promise.reject("Invalid zip code input");
		}
		return Promise.resolve();
	};
    
    const validateDocumentNumberInput = (rule: any, value: string) => {
		if (!validateCPF(value)) {
			return Promise.reject("Invalid document number input");
		}
		return Promise.resolve();
	};

	const disabledDate: RangePickerProps["disabledDate"] = (current) => {
		return current && current > moment().endOf("day");
	};

	const showModal = () => {
		setOpen(true);
	};

	const handleOk = () => {
		setConfirmLoading(true);

		form
			.validateFields()
			.then((values) => {
				axios
					.post("http://localhost:3001/users", values, {
						headers: {
							"x-api-key": apiKey,
						},
					})
					.then(() => {
						alert("Usuario Criado com sucesso!");
						setConfirmLoading(false);
						setOpen(false);
						form.resetFields();
						openNotificationWithIcon(
							"success",
							"User created successfully",
							"User created successfully"
						);
					})
					.catch(() => {
						setConfirmLoading(false);
						openNotificationWithIcon(
							"error",
							"Error on creating user",
							"Something wrong occurred on creating user"
						);
					});
			})
			.catch((info) => {
				setConfirmLoading(false);
			});
	};

	const handleCancel = () => {
		form.resetFields();
		setOpen(false);
	};

	return (
		<>
			{contextHolder}
			<Button type="primary" onClick={showModal} disabled={!validApiKey}>
				Create User
			</Button>
			<Modal
				title="Create User"
				open={open}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
				width={1000}
				cancelText="Cancel"
				okText="Create"
			>
				<Form
					form={form}
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 14 }}
					initialValues={{ addresses: [], phoneNumbers: [] }}
				>
					<Form.Item
						label="First Name"
						name="firstName"
						rules={[
							{ required: true, message: "Please input the first name!" },
							{ max: 50, message: "Max 50 characters" },
						]}
					>
						<Input placeholder="John"/>
					</Form.Item>

					<Form.Item
						label="Last Name"
						name="lastName"
						rules={[
							{
								required: true,
								message: "Please input the last name!",
								max: 50,
							},
							{ max: 50, message: "Max 50 characters" },
						]}
					>
						<Input placeholder="Doe" />
					</Form.Item>

					<Form.Item
						label="Date of Birth"
						name="dateOfBirth"
						rules={[
							{ required: true, message: "Please select the date of birth!" },
						]}
					>
						<DatePicker format="DD/MM/YYYY" disabledDate={disabledDate} />
					</Form.Item>

					<Form.Item
						label="Email"
						name="email"
						rules={[
							{ required: true, message: "Please input the email!" },
							{
								validator: validateEmailInput,
								message: "Invalid email input",
							},
						]}
					>
						<Input type="email" placeholder="example@example.com"/>
					</Form.Item>

					<Form.Item
						label="Document Number"
						name="documentNumber"
						rules={[
							{ required: true, message: "Please input the document number!" },
                            {
                                validator: validateDocumentNumberInput,
                                message: "Invalid document number input",
                            },
						]}
					>
						<Input placeholder="828.541.870-75"/>
					</Form.Item>

					<Form.List name="addresses">
						{(fields, { add, remove }) => (
							<>
								{fields.map(({ key, name, ...restField }) => (
									<div key={key}>
										<Form.Item
											{...restField}
											label="Street"
											name={[name, "street"]}
											rules={[
												{ required: true, message: "Please input the street!" },
											]}
										>
											<Input placeholder="Rua São Luíz" />
										</Form.Item>

										<Form.Item
											{...restField}
											label="City"
											name={[name, "city"]}
											rules={[
												{ required: true, message: "Please input the city!" },
											]}
										>
											<Input placeholder="São José do Rio Preto"/>
										</Form.Item>

										<Form.Item
											{...restField}
											label="State"
											name={[name, "State"]}
											rules={[
												{ required: true, message: "Please input the State!" },
											]}
										>
											<Input placeholder="São Paulo" />
										</Form.Item>

										<Form.Item
											{...restField}
											label="ZipCode"
											name={[name, "ZipCode"]}
											rules={[
												{
													required: true,
													message: "Please input the zipCode!",
												},
                                                {
                                                    validator: validateZipCodeInput,
                                                    message: "Invalid CEP input",
                                                }
											]}
										>
											<Input placeholder="89451-010"/>
										</Form.Item>

										<Button type="link" onClick={() => remove(name)}>
											Remove Address
										</Button>
									</div>
								))}
								<Form.Item>
									<Button
										type="dashed"
										onClick={() => add()}
										style={{ width: "100%" }}
									>
										Add Address
									</Button>
								</Form.Item>
							</>
						)}
					</Form.List>

					<Form.List name="phoneNumbers">
						{(fields, { add, remove }) => (
							<>
								{fields.map(({ key, name, ...restField }) => (
									<div key={key}>
										<Form.Item
											{...restField}
											label="Number"
											name={[name, "number"]}
											rules={[
												{
													required: true,
													message: "Please input the phone number!",
												},
                                                {
                                                    validator: validatePhoneNumberInput,
                                                    message: "Invalid phone number input",
                                                }
											]}
										>
											<Input placeholder="(44) 1234-1234 or (44) 91234-1234" />
										</Form.Item>

										<Form.Item
											{...restField}
											label="Type"
											name={[name, "type"]}
											rules={[
												{
													required: true,
													message: "Please select the phone number type!",
												},
											]}
										>
											<Select>
												<Option value="home">Home</Option>
												<Option value="work">Work</Option>
											</Select>
										</Form.Item>

										<Button type="link" onClick={() => remove(name)}>
											Remove Phone Number
										</Button>
									</div>
								))}
								<Form.Item>
									<Button
										type="dashed"
										onClick={() => add()}
										style={{ width: "100%" }}
									>
										Add Phone Number
									</Button>
								</Form.Item>
							</>
						)}
					</Form.List>
				</Form>
			</Modal>
		</>
	);
};

export default CreateUserModal;
