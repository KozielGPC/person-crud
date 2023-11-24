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
			<h2>Users</h2>
			<UserTable />
			<Divider />
			<h2>Logs</h2>
			<LogTable />
		</>
	);
};

export default Home;
