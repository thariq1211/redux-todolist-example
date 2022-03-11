import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

export default function ListTodo({status, title, description, onClick}) {
  const style = {
    div: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      marginBottom: "1rem",
      cursor: "pointer"
    },
    todoContent: {
      marginTop: "5px"
    }
  };

  return (
    <div role="button" onClick={onClick} style={style.div}>
      <Card style={{ border: `1px solid ${status !== 0 ? "#01ac01" : "#ff003e"}` }}>
        <CardContent>
          <Typography 
            color="textSecondary" 
            variant="h5" 
            component="h5" 
            gutterBottom
          >{title}</Typography>
          <Typography
            style={style.todoContent} 
            color="textSecondary" 
            component="p" 
            variant="caption"
          >{description}</Typography>
        </CardContent>
      </Card>
    </div>
  )
}