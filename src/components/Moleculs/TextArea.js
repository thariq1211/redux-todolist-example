import React from "react";
import { TextareaAutosize } from "@material-ui/core";

export default function TextArea(props) {
	return (
		<TextareaAutosize
      style={{ width: "100%", border: "1px solid #757575" }}
			minRows={3}
			placeholder="input description"
			onChange={props.onChange}
			defaultValue={props.defaultValue}
		/>
	);
}
