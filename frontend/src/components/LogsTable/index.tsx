import { ILog } from "../../interfaces/log";
import { Table, Divider, notification } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import moment from "moment";
import { errorHandler } from "../../tools/errorHandler";
import api from "../../providers/api";

export function LogTable() {
	const [logs, setLogs] = useState<ILog[] | []>([]);
	const { validApiKey } = useContext(ApiKeyContext);

	const [notificationApi, contextHolder] = notification.useNotification();

	useEffect(() => {
		if (validApiKey) {
			api
				.get("/logs")
				.then((response) => {
					if (response.status === 200) {
						setLogs(response.data.data);
					} else {
						setLogs([]);
					}
				})
				.catch((error) => {
					errorHandler(error, notificationApi);
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
		{
			title: "Request Time",
			dataIndex: "requestTime",
			key: "requestTime",
			render: (text: string) => moment(text).format("YYYY/MM/DD HH:mm:ss"),
		},
		{
			title: "Response Time",
			dataIndex: "responseTime",
			key: "responseTime",
			render: (text: string) => moment(text).format("YYYY/MM/DD HH:mm:ss"),
		},
		{ title: "Action", key: "operation", render: () => <a>Publish</a> },
	];

	return (
		<>
			{contextHolder}
			<Table
				title={() => <h1>Logs</h1>}
				rowKey={(record) => record._id}
				scroll={{ x: 1000 }}
				className="components-table-demo-nested"
				columns={columns}
				expandable={{ expandedRowRender }}
				dataSource={logs}
				bordered
				rowClassName={(record, index) =>
					index % 2 === 0 ? "table-row-light" : "table-row-dark"
				}
			/>
		</>
	);
}
