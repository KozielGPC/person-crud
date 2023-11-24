import React, { useContext, useEffect, useState } from "react";
import { ILog } from "../../interfaces/log";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import axios from "axios";

const LogsTable = () => {
	const [logs, setLogs] = useState<ILog[] | []>([]);
	const { apiKey, validApiKey } = useContext(ApiKeyContext);

	useEffect(() => {
		if (validApiKey) {
			axios
				.get("http://localhost:3001/logs", {
					headers: {
						"x-api-key": apiKey,
					},
				})
				.then((response) => {
					if (response.status === 200) {
						setLogs(response.data.data);
					} else {
						setLogs([]);
					}
				});
		} else {
			setLogs([]);
		}
	}, [validApiKey]);

	return (
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>url</th>
					<th>method</th>
					<th>requestTime</th>
					<th>responseTime</th>
					<th>statusCode</th>
					<th>userAgent</th>
					<th>body</th>
					<th>query</th>
					<th>params</th>
				</tr>
			</thead>
			<tbody>
				{logs.map((log) => (
					<tr key={log._id}>
						<td>{log._id}</td>
						<td>{log.url}</td>
						<td>{log.method}</td>
						<td>{log.requestTime}</td>
						<td>{log.responseTime}</td>
						<td>{log.statusCode}</td>
						<td>{log.userAgent}</td>
						<td>{JSON.stringify(log.body)}</td>
						<td>{JSON.stringify(log.query)}</td>
						<td>{JSON.stringify(log.params)}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default LogsTable;
