import { Form, Input, notification, Button, Layout, Card } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { IAddress } from "../../interfaces/user";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import { openNotificationWithIcon } from "../../tools/showNotification";
import { validateZipCodeInput } from "../../tools/formValidators";

export const AddressesForm = (props: {
	addresses: IAddress[];
	userId: string;
}) => {
	const { apiKey } = useContext(ApiKeyContext);
	const [api, contextHolder] = notification.useNotification();

	const [hasInputsChanged, setHasInputsChanged] = useState<boolean>(false);
	const [form] = Form.useForm();

	const onFinish = (values: { addresses: Record<string, IAddress> }) => {
		const input: IAddress[] = Object.entries(values.addresses)
			.filter((e) => e[1]?.city)
			.map((value) => {
				return {
					_id: value[1]._id,
					state: value[1].state,
					city: value[1].city,
					street: value[1].street,
					zipCode: value[1].zipCode,
				};
			});

		console.log("input", input);

		try {
			axios
				.put(
					`http://localhost:3001/users/${props.userId}/addresses`,
					{ addresses: input },
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
							"User addresses updated successfully",
							"User addresses updated successfully"
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
						"Error updating user addresses",
						error?.response?.data?.message ??
							"Something wrong occurred on updating user addresses"
					);
				});
		} catch (errInfo) {
			openNotificationWithIcon(
				api,
				"error",
				"Error updating user addresses",
				"Something wrong occurred on updating user addresses"
			);
		}
	};

	return (
		<>
			{contextHolder}
			<Layout className="addresses_container">
				<Layout style={{ padding: "24px" }}>
					<Card title="Addresses" style={{ marginBottom: "24px" }}>
						<Form
							form={form}
							name="dynamic_form_addresses"
							onFinish={onFinish}
							autoComplete="off"
							onFieldsChange={() => {
								setHasInputsChanged(true);
							}}
							initialValues={{
								addresses: props.addresses,
							}}
							preserve={false}
						>
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
													name={[name, "zipCode"]}
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
