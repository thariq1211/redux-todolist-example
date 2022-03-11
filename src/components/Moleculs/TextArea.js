import React from "react";
import { TextareaAutosize } from "@material-ui/core";

export default function TextArea(props) {
	const styles = {
		width: "99%",
		borderRadius: "5px",
		borderColor: "gray",
		padding: "5px",
	};
	return (
		<TextareaAutosize
			style={styles}
			rowsMin={4}
			placeholder="input description"
			onChange={props.onChange}
			defaultValue={props.defaultValue}
		/>
	);
}
