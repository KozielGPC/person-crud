import {
	Form,
	Input,
	notification,
	Button,
	Select,
	Layout,
	Card,
	Row,
	Col,
} from "antd";
import React, { useState } from "react";
import { IPhoneNumber } from "../../interfaces/user";
import { openNotificationWithIcon } from "../../tools/showNotification";
import { validatePhoneNumberInput } from "../../tools/formValidators";
import api from "../../providers/api";
import { errorHandler } from "../../tools/errorHandler";
import { normalizePhoneNumber } from "../../tools/formNormalizers";
const { Option } = Select;

export const PhoneNumbersForm = (props: {
	phoneNumbers: IPhoneNumber[];
	userId: string;
}) => {
	const [notificationApi, contextHolder] = notification.useNotification();

	const [hasInputsChanged, setHasInputsChanged] = useState<boolean>(false);
	const [form] = Form.useForm();

	const [loading, setLoading] = useState<boolean>(false);

	const onFinish = (values: { phoneNumbers: Record<string, IPhoneNumber> }) => {
		setLoading(true);
		const input: IPhoneNumber[] = Object.entries(values.phoneNumbers)
			.filter((e) => e[1]?.number)
			.map((value) => {
				return {
					_id: value[1]._id,
					number: value[1].number,
					type: value[1].type,
				};
			});

		try {
			api
				.put(`/users/${props.userId}/phoneNumbers`, {
					phoneNumbers: input,
				})
				.then((response) => {
					if (response.status === 200) {
						openNotificationWithIcon(
							notificationApi,
							"success",
							"User phone numbers updated successfully",
							"User phone numbers updated successfully"
						);
					}
				})
				.finally(() => {
					setHasInputsChanged(false);
					setLoading(false);
				})
				.catch((error) => {
					throw error;
				});
		} catch (error) {
			errorHandler(error, notificationApi);
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
							initialValues={{
								phoneNumbers: props.phoneNumbers,
							}}
							preserve={false}
						>
							<Form.List name="phoneNumbers">
								{(fields, { add, remove }) => (
									<Row gutter={16}>
										{fields.map(({ key, name, ...restField }) => (
											<Col xs={8} sm={8} md={8} lg={6} key={key}>
												<Card
													title={`Phone Number ${key + 1}`}
													style={{ marginBottom: "16px" }}
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
															labelCol={{ span: 24 }}
															wrapperCol={{ span: 24 }}
															name={[name, "type"]}
															rules={[
																{
																	required: true,
																	message:
																		"Please select the phone number type!",
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
										<Col xs={8} sm={8} md={8} lg={6}>
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
					</Card>
				</Layout>
				<Button
					type="primary"
					disabled={!hasInputsChanged}
					onClick={() => form.submit()}
					loading={loading}
				>
					Save
				</Button>
			</Layout>
		</>
	);
};
