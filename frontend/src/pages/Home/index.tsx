import React from "react";
import { UserTable } from "../../components/UsersTable";
import { LogTable } from "../../components/LogsTable";
import { ApiKeyValidatorContainer } from "../../components/ValidateApiKey";
import { Divider, Flex, Row } from "antd";

const Home = () => {
	return (
		<Flex
			style={{
				flexDirection: "column",
				padding: "10px 50px",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Row>
				<ApiKeyValidatorContainer />
			</Row>
			<Row>
				<Divider style={{ height: "1px", backgroundColor: "black" }} />
				<UserTable />
			</Row>
			<Row>
				<Divider style={{ height: "1px", backgroundColor: "black" }} />
				<LogTable />
			</Row>
		</Flex>
	);
};

export default Home;
