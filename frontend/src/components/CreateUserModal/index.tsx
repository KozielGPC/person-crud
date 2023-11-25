import React, { useContext, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Modal } from "antd";
import axios from "axios";
import { ApiKeyContext } from "../../context/ApiKeyContext";

const { Option } = Select;

const CreateUserModal = () => {
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);

	const { apiKey, validApiKey } = useContext(ApiKeyContext);

	const [form] = Form.useForm();

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
					})
					.catch(() => {
						alert("Erro ao criar o usuario");
					});
			})
			.catch((info) => {
				console.log("Validate Failed:", info);
				setConfirmLoading(false);
			});
	};

	const handleCancel = () => {
		form.resetFields();
		setOpen(false);
	};

	return (
		<>
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
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Last Name"
						name="lastName"
						rules={[{ required: true, message: "Please input the last name!" }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Date of Birth"
						name="dateOfBirth"
						rules={[
							{ required: true, message: "Please select the date of birth!" },
						]}
					>
						<DatePicker style={{ width: "100%" }} />
					</Form.Item>

					<Form.Item
						label="Email"
						name="email"
						rules={[{ required: true, message: "Please input the email!" }]}
					>
						<Input type="email" />
					</Form.Item>

					<Form.Item
						label="Document Number"
						name="documentNumber"
						rules={[
							{ required: true, message: "Please input the document number!" },
						]}
					>
						<Input />
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
											<Input />
										</Form.Item>

										<Form.Item
											{...restField}
											label="City"
											name={[name, "city"]}
											rules={[
												{ required: true, message: "Please input the city!" },
											]}
										>
											<Input />
										</Form.Item>

										<Form.Item
											{...restField}
											label="State"
											name={[name, "State"]}
											rules={[
												{ required: true, message: "Please input the State!" },
											]}
										>
											<Input />
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
											]}
										>
											<Input />
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
											]}
										>
											<Input />
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
												{/* Add other phone number types as needed */}
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
