import React from "react";
import { Modal, Card, CardContent, Typography } from "@material-ui/core";


export default function ModalComponent({children, open, onClose, title}) {
  const styles = {
    card: {
      position: "absolute",
      marginLeft: "20vw",
      marginRight: "20vw",
      top: "35%",
      left: "0",
      right: "0"
    }
  }
  return (
    <Modal open={open} onClose={onClose}>
      <Card style={styles.card}>
        <CardContent>
          <Typography 
            variant="h5" 
            color="textSecondary" 
            component="h5"
            >{title}</Typography>
          {children}
        </CardContent>
      </Card>
    </Modal>
  )
}