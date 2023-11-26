import React from "react";
import { UserTable } from "../../components/UsersTable";
import { LogTable } from "../../components/LogsTable";
import { ApiKeyValidatorContainer } from "../../components/ValidateApiKey";
import { Divider, Row, Col } from "antd";

const Home = () => {
	return (
		<Row justify="center" align="middle">
			<Col
				style={{ width: "100%", padding: "10px" }}
				xs={24}
				sm={24}
				md={24}
				lg={24}
				xl={24}
				xxl={20}
			>
				<ApiKeyValidatorContainer />
				<Divider style={{ height: "1px", backgroundColor: "black" }} />
				<UserTable />
				<Divider style={{ height: "1px", backgroundColor: "black" }} />
				<LogTable />
			</Col>
		</Row>
	);
};

export default Home;
