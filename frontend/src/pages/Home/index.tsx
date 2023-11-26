import React from "react";
import { UserTable } from "../../components/UsersTable";
import { LogTable } from "../../components/LogsTable";
import { ApiKeyValidatorContainer } from "../../components/ValidateApiKey";
import { Divider, Row, Col } from "antd";

const Home = () => {
	return (
		<Row justify="center" align="middle">
			<Col xs={24} sm={22} md={22} lg={20} xl={22} xxl={20}>
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
