import React from "react";
import {UserTable} from "../../components/UsersTable";
import {LogTable} from "../../components/LogsTable";
import { ApiKeyValidatorContainer } from "../../components/ValidateApiKey";
import { Container, Divider } from "@mui/material";

const Home = () => {
	return (
		<Container
			style={{
				marginTop: "20px",
				border: "1px solid black",
				display: "flex",
				flexDirection: "column",
				justifyContent: "left",
			}}
		>
			<ApiKeyValidatorContainer />
			<Divider />
			<h2>Users</h2>
			<UserTable />
			<Divider />
			<h2>Logs</h2>
			<LogTable />
		</Container>
	);
};

export default Home;
