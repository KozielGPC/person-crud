import React from "react";
import UserTable from "../../components/UsersTable";
import LogsTable from "../../components/LogsTable";
import { ApiKeyValidatorContainer } from "../../components/ValidateApiKey";

const Home = () => {
	return (
		<div>
			<ApiKeyValidatorContainer />

			<h2>Users</h2>
			<UserTable />

			<h2>Logs</h2>
			<LogsTable />
		</div>
	);
};

export default Home;
