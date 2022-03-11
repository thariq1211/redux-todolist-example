import React from "react";
import { TextField } from "@material-ui/core";

export default function TextFieldComponent(props) {
  return (
    <TextField 
      size="small"
      defaultValue={props.defaultValue}
      onChange={props.onChange}
      placeholder={props.placeholder} 
      variant="outlined"
      {...props}
    ></TextField>
  )
}