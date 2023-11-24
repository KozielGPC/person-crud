import React, { useContext, useEffect, useState } from "react";
import { IUser } from "../../interfaces/user";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";

function Row(props: { row: IUser }) {
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
				<TableCell align="right">{row.firstName}</TableCell>
				<TableCell align="right">{row.lastName}</TableCell>
				<TableCell align="right">{row.documentNumber}</TableCell>
				<TableCell align="right">{row.email}</TableCell>
				<TableCell align="right">{row.dateOfBirth}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div">
								Addresses
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>City</TableCell>
										<TableCell>State</TableCell>
										<TableCell align="right">Street</TableCell>
										<TableCell align="right">Zip Code</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.addresses.map((address) => (
										<TableRow key={address.city}>
											<TableCell component="th" scope="row">
												{address.city}
											</TableCell>
											<TableCell>{address.state}</TableCell>
											<TableCell align="right">{address.street}</TableCell>
											<TableCell align="right">{address.zipCode}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div">
								Phone Numbers
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>Number</TableCell>
										<TableCell>Type</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.phoneNumbers.map((phone_number) => (
										<TableRow key={phone_number.number}>
											<TableCell component="th" scope="row">
												{phone_number.number}
											</TableCell>
											<TableCell>{phone_number.type}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

const UserTable = () => {
	const { apiKey, validApiKey } = useContext(ApiKeyContext);

	const [users, setUsers] = useState<IUser[] | []>([]);

	useEffect(() => {
		if (validApiKey) {
			axios
				.get("http://localhost:3001/users", {
					headers: {
						"x-api-key": apiKey,
					},
				})
				.then((response) => {
					if (response.status === 200) {
						setUsers(response.data.data);
					} else {
						setUsers([]);
					}
				});
		} else {
			setUsers([]);
		}
	}, [validApiKey]);

	const [open, setOpen] = useState(false);
	const [newItem, setNewItem] = useState("");

	const handleAddItem = () => {
		// const newId = data.length + 1;
		// const newItemObject = { id: newId, name: newItem };
		// setData([...data, newItemObject]);
		handleClose();
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setNewItem("");
	};

	return validApiKey ? (
		<div>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell />
						<TableCell>ID</TableCell>
						<TableCell align="right">firstName</TableCell>
						<TableCell align="right">lastName</TableCell>
						<TableCell align="right">documentNumber</TableCell>
						<TableCell align="right">email</TableCell>
						<TableCell align="right">dateOfBirth</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((user) => (
						<Row key={user._id} row={user} />
					))}
				</TableBody>
			</Table>

			<Button variant="contained" color="primary" onClick={handleOpen}>
				Add Item
			</Button>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add New Item</DialogTitle>
				<DialogContent>
					<TextField
						label="Item Name"
						value={newItem}
						onChange={(e) => setNewItem(e.target.value)}
					/>
					<Button variant="contained" color="primary" onClick={handleAddItem}>
						Add
					</Button>
				</DialogContent>
			</Dialog>
		</div>
	) : (
		<h1>Acesso não autorizado</h1>
	);
};

export default UserTable;
