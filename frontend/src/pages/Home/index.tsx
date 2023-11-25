import React from "react";
import {UserTable} from "../../components/UsersTable";
import {LogTable} from "../../components/LogsTable";
import { ApiKeyValidatorContainer } from "../../components/ValidateApiKey";
import { Divider } from "antd";

const Home = () => {
	return (
		<>
			<ApiKeyValidatorContainer />
			<Divider />
			<UserTable />
			<Divider />
			<LogTable />
		</>
	);
};

export default Home;
