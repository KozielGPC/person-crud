import { useContext } from "react";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import { Form, Input, Button, Typography, Tag } from "antd";
import { Col, Row } from "antd";
import api from "../../providers/api";

type FieldType = {
	apiKey?: string;
};

export const ApiKeyValidatorContainer = () => {
	const { apiKey, setApiKey, validApiKey, setValidApiKey } =
		useContext(ApiKeyContext);

	const handleSubmit = async () => {
		const { data, status } = await api.get("/validate-api-key", {
			params: {
				apiKey: apiKey,
			},
		});
		if (status === 200 && data.data.isValid) {
			setValidApiKey(true);
		} else {
			setValidApiKey(false);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div>
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
							<Tag color={validApiKey ? "green" : "red"}>
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
