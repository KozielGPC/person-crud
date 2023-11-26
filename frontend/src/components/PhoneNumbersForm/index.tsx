import {
	Form,
	Input,
	notification,
	Button,
	Select,
	Layout,
	Card,
} from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { IPhoneNumber } from "../../interfaces/user";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import { openNotificationWithIcon } from "../../tools/showNotification";
import { validatePhoneNumberInput } from "../../tools/formValidators";
const { Option } = Select;

export const PhoneNumbersForm = (props: {
	phoneNumbers: IPhoneNumber[];
	userId: string;
}) => {
	const { apiKey } = useContext(ApiKeyContext);
	const [api, contextHolder] = notification.useNotification();

	const [hasInputsChanged, setHasInputsChanged] = useState<boolean>(false);
	const [form] = Form.useForm();

	const onFinish = (values: { phoneNumbers: Record<string, IPhoneNumber> }) => {
		const input: IPhoneNumber[] = Object.entries(values.phoneNumbers)
			.filter((e) => e[1]?.number)
			.map((value) => {
				return {
					_id: value[1]._id,
					number: value[1].number,
					type: value[1].type,
				};
			});

		console.log("input", input);

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
							"User phone numbers updated successfully",
							"User phone numbers updated successfully"
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
						"Error updating user phone numbers",
						error?.response?.data?.message ??
							"Something wrong occurred on updating user phone numbers"
					);
				});
		} catch (errInfo) {
			openNotificationWithIcon(
				api,
				"error",
				"Error editing user",
				"Something wrong occurred on updating user phone numbers"
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
							initialValues={{
								phoneNumbers: props.phoneNumbers,
							}}
							preserve={false}
						>
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
														},
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
														<Option value="personal">Personal</Option>
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
