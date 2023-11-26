import { ILog } from "../../interfaces/log";
import { Table, Divider } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

export function LogTable() {
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
				})
				.catch((error) => {
					setLogs([]);
				});
		} else {
			setLogs([]);
		}
	}, [validApiKey]);

	const expandedRowRender = (row: ILog) => {
		return (
			<div>
				<h1>Body</h1>
				{row.body ? (
					<JsonView
						data={row.body}
						shouldExpandNode={allExpanded}
						style={defaultStyles}
					/>
				) : (
					<p>No body</p>
				)}

				<Divider />
				<h1>Params</h1>
				{row.params ? (
					<JsonView
						data={row.params}
						shouldExpandNode={allExpanded}
						style={defaultStyles}
					/>
				) : (
					<p>No params</p>
				)}
				<Divider />
				<h1>Query</h1>
				{row.query ? (
					<JsonView
						data={row.query}
						shouldExpandNode={allExpanded}
						style={defaultStyles}
					/>
				) : (
					<p>No query</p>
				)}
			</div>
		);
	};
	const columns = [
		{ title: "ID", dataIndex: "_id", key: "id" },
		{ title: "Method", dataIndex: "method", key: "method" },
		{ title: "URL", dataIndex: "url", key: "url" },
		{ title: "User Agent", dataIndex: "userAgent", key: "userAgent" },
		{ title: "Status Code", dataIndex: "statusCode", key: "statusCode" },
		{ title: "Request Time", dataIndex: "requestTime", key: "requestTime" },
		{ title: "Response Time", dataIndex: "responseTime", key: "responseTime" },
		{ title: "Action", key: "operation", render: () => <a>Publish</a> },
	];

	return (
		<Table
			title={() => <h1>Logs</h1>}
			rowKey={(record) => record._id}
			scroll={{ x: 1300 }}
			className="components-table-demo-nested"
			columns={columns}
			expandable={{ expandedRowRender }}
			dataSource={logs}
			bordered
			rowClassName={(record, index) =>
				index % 2 === 0 ? "table-row-light" : "table-row-dark"
			}
		/>
	);
}
