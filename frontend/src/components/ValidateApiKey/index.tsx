import { useContext, useState } from "react";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import {
	Form,
	Input,
	Button,
	Typography,
	Tag,
	notification
} from "antd";
import { Col, Row } from "antd";
import api from "../../providers/api";
import { openNotificationWithIcon } from "../../tools/showNotification";

type FieldType = {
	apiKey?: string;
};
export const ApiKeyValidatorContainer = () => {
	const { apiKey, setApiKey, validApiKey, setValidApiKey } =
		useContext(ApiKeyContext);

	const [notificationApi, contextHolder] = notification.useNotification();

	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = async () => {
		setLoading(true);
		const { data, status } = await api.post("/auth/validate", {
			apiKey: apiKey,
		});

		setLoading(false);
		if (status === 200 && data.data.isValid) {
			api.defaults.headers.common["token"] = data.data.token;
			setValidApiKey(true);
		} else {
			setValidApiKey(false);
			delete api.defaults.headers.common["token"];
		}
	};

	const onFinishFailed = () => {
		setValidApiKey(false);
		delete api.defaults.headers.common["token"];
		openNotificationWithIcon(
			notificationApi,
			"error",
			"Unexpected exception on validating api key",
			"Something wrong occurred on validating api key"
		);
	};

	return (
		<div>
			{contextHolder}
			<Row>
				<Col
					xs={20}
					sm={12}
					md={12}
					lg={12}
					xl={12}
					xxl={12}
					style={{
						width: "100%",
						padding: "10px",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Col xs={24} sm={12} md={12} lg={8} xl={8}>
						<Typography.Title level={3}>
							<Tag
								color={validApiKey ? "green" : "red"}
								style={{ fontSize: "18px", padding: "10px" }}
							>
								{validApiKey ? "Valid Api Key" : "Invalid Api Key"}
							</Tag>
						</Typography.Title>
					</Col>

					<Form
						id="api_key_form"
						name="api_key"
						initialValues={{ remember: true }}
						onFinishFailed={onFinishFailed}
						onSubmitCapture={handleSubmit}
						autoComplete="on"
					>
						<Form.Item<FieldType>
							label="API Key"
							name="apiKey"
							labelCol={{ span: 24 }}
							wrapperCol={{ span: 24 }}
						>
							<Input onChange={(e) => setApiKey(e.target.value)} />
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								form="api_key_form"
								key="submit"
								loading={loading}
							>
								Submit
							</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</div>
	);
};
