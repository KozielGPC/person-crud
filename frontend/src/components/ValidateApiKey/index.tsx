import { useContext } from "react";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import axios from "axios";
import { Form, Input, Button } from "antd";
import { Col, Row } from "antd";

type FieldType = {
	apiKey?: string;
};

export const ApiKeyValidatorContainer = () => {
	const { apiKey, setApiKey, validApiKey, setValidApiKey } =
		useContext(ApiKeyContext);

	const handleSubmit = async () => {
		const { data, status } = await axios.get(
			"http://localhost:3001/validate-api-key",
			{
				params: {
					apiKey: apiKey,
				},
			}
		);
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
				<Col span={8}>
					<Form
						id="api_key_form"
						name="api_key"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						style={{ maxWidth: 600 }}
						initialValues={{ remember: true }}
						onFinishFailed={onFinishFailed}
						onSubmitCapture={handleSubmit}
						autoComplete="on"
					>
						<Form.Item<FieldType> label="API Key" name="apiKey">
							<Input onChange={(e) => setApiKey(e.target.value)} />
						</Form.Item>

						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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
				<Col span={8} offset={8}>
					<h1>Valid Api Key: {validApiKey ? "true" : "false"}</h1>
				</Col>
			</Row>
		</div>
	);
};
