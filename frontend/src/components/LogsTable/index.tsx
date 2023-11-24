import { ILog } from "../../interfaces/log";
import { Table, Divider } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ApiKeyContext } from "../../context/ApiKeyContext";

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
				});
		} else {
			setLogs([]);
		}
	}, [validApiKey]);

	// export interface ILog {
	// 	_id: string;
	// 	requestTime: string;
	// 	responseTime: string;
	// 	method: string;
	// 	url: string;
	// 	statusCode: number;
	// 	userAgent: string;
	// 	body: any;
	// 	params: Record<string, any>;
	// 	query: Object;
	// }
	const columns = [
		{ title: "ID", dataIndex: "_id", key: "id" },
		{ title: "Method", dataIndex: "method", key: "method" },
		{ title: "URL", dataIndex: "url", key: "url" },
		{ title: "User Agent", dataIndex: "userAgent", key: "userAgent" },
		{ title: "Status Code", dataIndex: "statusCode", key: "statusCode" },
		{ title: "Request Time", dataIndex: "requestTime", key: "requestTime" },
		{ title: "Response Time", dataIndex: "responseTime", key: "responseTime" },
		{ title: "Body", dataIndex: "body", key: "body" },
		{ title: "Params", dataIndex: "params", key: "params" },
		{ title: "Query", dataIndex: "query", key: "query" },
		{ title: "Action", key: "operation", render: () => <a>Publish</a> },
	];

	return (
		<Table
			scroll={{ x: 1300 }}
			className="components-table-demo-nested"
			columns={columns}
			// expandable={{ expandedRowRender }}
			dataSource={logs}
		/>
	);
}
