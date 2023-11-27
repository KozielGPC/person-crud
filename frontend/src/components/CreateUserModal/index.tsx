import React, { useContext, useState } from "react";
import {
	Form,
	Input,
	Button,
	DatePicker,
	Select,
	Modal,
	notification,
	Row,
	Col,
	Card,
	Typography,
} from "antd";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import moment from "moment";
import type { RangePickerProps } from "antd/es/date-picker";
import { IUser } from "../../interfaces/user";
import { openNotificationWithIcon } from "../../tools/showNotification";
import {
	validateDocumentNumberInput,
	validateEmailInput,
	validatePhoneNumberInput,
	validateZipCodeInput,
} from "../../tools/formValidators";
import api from "../../providers/api";
import { errorHandler } from "../../tools/errorHandler";
import {
	normalizeDocumentNumber,
	normalizePhoneNumber,
	normalizeZipCode,
} from "../../tools/formNormalizers";

const { Option } = Select;

interface props {
	setUsers: (users: IUser[]) => void;
	users: IUser[];
}

const CreateUserModal = (props: props) => {
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);

	const { validApiKey } = useContext(ApiKeyContext);

	const [form] = Form.useForm();

	const [notificationApi, contextHolder] = notification.useNotification();

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
				api
					.post("/users", values)
					.then(() => {
						setConfirmLoading(false);
						setOpen(false);
						form.resetFields();
						openNotificationWithIcon(
							notificationApi,
							"success",
							"User created successfully",
							"User created successfully"
						);

						api.get("/users").then((response) => {
							if (response.status === 200) {
								props.setUsers(response.data.data);
							}
						});
					})
					.catch((error) => {
						throw error;
					});
			})
			.catch((error) => {
				setConfirmLoading(false);
				errorHandler(error, notificationApi);
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
					<Row gutter={24}>
						<Col sm={24} lg={12}>
							<Form.Item
								label="First Name"
								name="firstName"
								labelCol={{ span: 24 }}
								wrapperCol={{ span: 24 }}
								rules={[
									{ required: true, message: "Please input the first name!" },
									{ max: 50, message: "Max 50 characters" },
								]}
							>
								<Input placeholder="John" />
							</Form.Item>
						</Col>
						<Col sm={24} lg={12}>
							<Form.Item
								label="Last Name"
								labelCol={{ span: 24 }}
								wrapperCol={{ span: 24 }}
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
						</Col>
						<Col sm={24} md={8} lg={8}>
							<Form.Item
								label="Date of Birth"
								name="dateOfBirth"
								labelCol={{ span: 24 }}
								wrapperCol={{ span: 24 }}
								rules={[
									{
										required: true,
										message: "Please select the date of birth!",
									},
								]}
							>
								<DatePicker
									format="DD/MM/YYYY"
									disabledDate={disabledDate}
									style={{ width: "100%" }}
								/>
							</Form.Item>
						</Col>
						<Col sm={24} md={8} lg={8}>
							<Form.Item
								label="Email"
								name="email"
								labelCol={{ span: 24 }}
								wrapperCol={{ span: 24 }}
								rules={[
									{ required: true, message: "Please input the email!" },
									{
										validator: validateEmailInput,
										message: "Invalid email input",
									},
								]}
							>
								<Input type="email" placeholder="example@example.com" />
							</Form.Item>
						</Col>

						<Col sm={24} md={8} lg={8}>
							<Form.Item
								label="Document Number"
								name="documentNumber"
								labelCol={{ span: 24 }}
								wrapperCol={{ span: 24 }}
								normalize={normalizeDocumentNumber}
								rules={[
									{
										required: true,
										message: "Please input the document number!",
									},
									{
										validator: validateDocumentNumberInput,
										message: "Invalid document number input",
									},
								]}
							>
								<Input placeholder="828.541.870-75" />
							</Form.Item>
						</Col>
					</Row>

					<Typography.Title level={4}>Addresses</Typography.Title>

					<Form.List name="addresses">
						{(fields, { add, remove }) => (
							<Row gutter={16}>
								{fields.map(({ key, name, ...restField }) => (
									<Col xs={24} sm={12} md={12} lg={8} key={key}>
										<Card
											title={`Address ${key + 1}`}
											style={{ marginBottom: "16px" }}
										>
											<div key={key}>
												<Form.Item
													{...restField}
													label="Street"
													labelCol={{ span: 24 }}
													wrapperCol={{ span: 24 }}
													name={[name, "street"]}
													rules={[
														{
															required: true,
															message: "Please input the street!",
														},
													]}
												>
													<Input placeholder="Rua São Luíz" />
												</Form.Item>

												<Form.Item
													{...restField}
													label="City"
													labelCol={{ span: 24 }}
													wrapperCol={{ span: 24 }}
													name={[name, "city"]}
													rules={[
														{
															required: true,
															message: "Please input the city!",
														},
													]}
												>
													<Input placeholder="São José do Rio Preto" />
												</Form.Item>

												<Form.Item
													{...restField}
													label="State"
													labelCol={{ span: 24 }}
													wrapperCol={{ span: 24 }}
													name={[name, "state"]}
													rules={[
														{
															required: true,
															message: "Please input the State!",
														},
													]}
												>
													<Input placeholder="São Paulo" />
												</Form.Item>

												<Form.Item
													{...restField}
													label="ZipCode"
													labelCol={{ span: 24 }}
													wrapperCol={{ span: 24 }}
													name={[name, "zipCode"]}
													normalize={normalizeZipCode}
													rules={[
														{
															required: true,
															message: "Please input the zipCode!",
														},
														{
															validator: validateZipCodeInput,
															message: "Invalid CEP input",
														},
													]}
												>
													<Input placeholder="89451-010" />
												</Form.Item>

												<Button type="link" onClick={() => remove(name)}>
													Remove Address
												</Button>
											</div>
										</Card>
									</Col>
								))}
								<Col xs={24} sm={12} md={12} lg={8}>
									<Form.Item>
										<Button
											type="dashed"
											onClick={() => add()}
											style={{ width: "100%" }}
										>
											Add Address
										</Button>
									</Form.Item>
								</Col>
							</Row>
						)}
					</Form.List>

					<Typography.Title level={4}>Phone Numbers</Typography.Title>
					<Form.List name="phoneNumbers">
						{(fields, { add, remove }) => (
							<Row gutter={16}>
								{fields.map(({ key, name, ...restField }) => (
									<Col xs={24} sm={12} md={12} lg={8} key={key}>
										<Card
											title={`Phone Number ${key + 1}`}
											style={{
												marginBottom: "16px",
											}}
										>
											<div>
												<Form.Item
													{...restField}
													label="Number"
													name={[name, "number"]}
													labelCol={{ span: 24 }}
													wrapperCol={{ span: 24 }}
													normalize={normalizePhoneNumber}
													rules={[
														{
															required: true,
															message: "Please input the phone number!",
														},
														{
															validator: validatePhoneNumberInput,
															message: "Invalid phone number input",
														},
													]}
												>
													<Input placeholder="(44) 1234-1234 or (44) 91234-1234" />
												</Form.Item>

												<Form.Item
													{...restField}
													label="Type"
													name={[name, "type"]}
													labelCol={{ span: 24 }}
													wrapperCol={{ span: 24 }}
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
														<Option value="personal">Personal</Option>
													</Select>
												</Form.Item>

												<Button type="link" onClick={() => remove(name)}>
													Remove Phone Number
												</Button>
											</div>
										</Card>
									</Col>
								))}
								<Col xs={24} sm={12} md={12} lg={8}>
									<Form.Item>
										<Button
											type="dashed"
											onClick={() => add()}
											style={{ width: "100%" }}
										>
											Add Phone Number
										</Button>
									</Form.Item>
								</Col>
							</Row>
						)}
					</Form.List>
				</Form>
			</Modal>
		</>
	);
};

export default CreateUserModal;
