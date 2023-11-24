import React, { useContext, useEffect, useState } from "react";
import { ILog } from "../../interfaces/log";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import { Container } from "@mui/material";

function Row(props: { row: ILog }) {
	const { row } = props;
	const [open, setOpen] = useState(false);

	return (
		<React.Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row._id}
				</TableCell>
				<TableCell align="right">{row.method}</TableCell>
				<TableCell align="right">{row.url}</TableCell>
				<TableCell align="right">{row.statusCode}</TableCell>
				<TableCell align="right">{row.userAgent}</TableCell>
				<TableCell align="right">{row.requestTime}</TableCell>
				<TableCell align="right">{row.responseTime}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div">
								Body
							</Typography>
							<TableCell>{JSON.stringify(row.body)}</TableCell>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div">
								Params
							</Typography>
							<TableCell>{JSON.stringify(row.params)}</TableCell>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div">
								Query
							</Typography>
							<TableCell>{JSON.stringify(row.query)}</TableCell>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

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

	return validApiKey ? (
		<Container style={{ marginTop: "20px", width: "100%" }}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell />
						<TableCell>ID</TableCell>
						<TableCell align="right">method</TableCell>
						<TableCell align="right">url</TableCell>
						<TableCell align="right">statusCode</TableCell>
						<TableCell align="right">userAgent</TableCell>
						<TableCell align="right">requestTime</TableCell>
						<TableCell align="right">responseTime</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{logs.map((log) => (
						<Row key={log._id} row={log} />
					))}
				</TableBody>
			</Table>
		</Container>
	) : (
		<h1>Acesso não autorizado</h1>
	);
};

export default LogsTable;
