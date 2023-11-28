import { ILog } from "../../interfaces/log";
import { Table, Divider, notification, Button } from "antd";
import React, { Key, useContext, useEffect, useState } from "react";
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

	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (validApiKey) {
			setLoading(true);
			api
				.get("/logs")
				.then((response) => {
					setLoading(false);
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

	function getUniqueStatusCodes(logs: ILog[]) {
		const uniqueStatusCodes: Set<number> = new Set();
		logs.forEach((log) => {
			if (log.statusCode !== undefined) {
				uniqueStatusCodes.add(log.statusCode);
			}
		});
		return Array.from(uniqueStatusCodes).map((value) => {
			return { text: value, value: value };
		});
	}

	function getUniqueMethods(logs: ILog[]) {
		const uniqueMethods: Set<string> = new Set();
		logs.forEach((log) => {
			if (log.method !== undefined) {
				uniqueMethods.add(log.method);
			}
		});
		return Array.from(uniqueMethods).map((value) => {
			return { text: value, value: value };
		});
	}

	const refresh = () => {
		if (validApiKey) {
			setLoading(true);
			api
				.get("/logs")
				.then((response) => {
					setLoading(false);
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
	};

	const columns = [
		{
			title: "ID",
			dataIndex: "_id",
			key: "id",
			filterSearch: true,
			sorter: (a: ILog, b: ILog) =>
				a._id.toString().localeCompare(b._id.toString()),
		},
		{
			title: "Method",
			dataIndex: "method",
			key: "method",
			filters: getUniqueMethods(logs),
			filterSearch: true,
			onFilter: (value: boolean | Key, record: ILog) => record.method == value,
		},
		{
			title: "URL",
			dataIndex: "url",
			key: "url",
			sorter: (a: ILog, b: ILog) => a.url.localeCompare(b.url),
		},
		{ title: "User Agent", dataIndex: "userAgent", key: "userAgent" },
		{
			title: "Status Code",
			dataIndex: "statusCode",
			key: "statusCode",
			filters: getUniqueStatusCodes(logs),
			filterSearch: true,
			onFilter: (value: boolean | Key, record: ILog) =>
				record.statusCode.toString() == value,
		},
		{
			title: "Request Time",
			dataIndex: "requestTime",
			key: "requestTime",
			render: (text: string) => moment(text).format("YYYY/MM/DD HH:mm:ss"),
			sorter: (a: ILog, b: ILog) =>
				moment(a.requestTime).valueOf() - moment(b.requestTime).valueOf(),
		},
		{
			title: "Response Time",
			dataIndex: "responseTime",
			key: "responseTime",
			render: (text: string) => moment(text).format("YYYY/MM/DD HH:mm:ss"),
			sorter: (a: ILog, b: ILog) =>
				moment(a.responseTime).valueOf() - moment(b.responseTime).valueOf(),
		},
	];

	return (
		<>
			{contextHolder}
			<Table
				title={() => (
					<div>
						<h1>Logs</h1>
						<Button
							type="primary"
							onClick={refresh}
							loading={loading}
							disabled={!validApiKey}
						>
							Refresh Logs
						</Button>
					</div>
				)}
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
