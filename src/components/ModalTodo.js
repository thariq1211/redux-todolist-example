import React, { useState } from "react";

import { Grid, Button } from "@material-ui/core";
import Textfield from "./moleculs/TextField";
import TextArea from "./moleculs/TextArea";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import SaveIcon from "@material-ui/icons/Save";
import MarkIcon from "@material-ui/icons/Done";

export default function DetailTodo({
	onsave,
	ondone,
	ondelete,
	title,
	description,
	status,
	mode,
}) {
	const [todo, setTodo] = useState({
		title: "",
		description: "",
	});
	const styles = {
		grid: {
			margin: "5px",
			width: "100%",
		},
		button: {
			margin: "5px",
		},
	};

	const onChangeInput = (key) => {
		return (event) => {
			setTodo({ ...todo, [key]: event.target.value });
		};
	};

	const ondeletebutton = () => {
		ondelete(todo);
	};

	const onsavebutton = () => {
		if (mode === "add") {
			onsave(todo);
		} else {
			const data = {
				title: todo.title === "" ? title : todo.title,
				description: todo.description === "" ? description : todo.description,
			};
			onsave(data);
		}
	};

	const onmarkdonebutton = () => {
		ondone(todo);
	};

	return (
		<Grid
			container
			direction="column"
			justify="flex-start"
			alignItems="flex-start"
		>
			<Grid md={11} style={styles.grid}>
				<Textfield
					fullWidth
					placeholder="input title"
					onChange={onChangeInput("title")}
					defaultValue={title}
				/>
			</Grid>
			<Grid md={11} style={styles.grid}>
				<TextArea
					placeholder="input description"
					onChange={onChangeInput("description")}
					defaultValue={description}
				/>
			</Grid>
			<Grid
				style={styles.grid}
				container
				direction="row"
				justify="flex-start"
				alignItems="flex-start"
			>
				<Grid md={3} style={styles.button}>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						size="small"
						onClick={onsavebutton}
					>
						<SaveIcon fontSize="small" />
						Save
					</Button>
				</Grid>
				{mode === "edit" && (
					<Grid md={4} style={styles.button}>
						<Button
							fullWidth
							variant="outlined"
							color="primary"
							size="small"
							onClick={onmarkdonebutton}
						>
							<MarkIcon fontSize="small" />
							{status === 0 ? "Mark as done" : "Mark as undone"}
						</Button>
					</Grid>
				)}
				{mode === "edit" && status === 0 && (
					<Grid md={3} style={styles.button}>
						<Button
							fullWidth
							variant="contained"
							color="secondary"
							size="small"
							onClick={ondeletebutton}
						>
							<DeleteIcon fontSize="small" />
							Delete
						</Button>
					</Grid>
				)}
			</Grid>
		</Grid>
	);
}
