import React from "react";

import { Grid, Button } from "@material-ui/core";
import Textfield from "./Moleculs/TextField";
import TextArea from "./Moleculs/TextArea";

export default function DetailTodo({
	onsave,
	ondone,
	ondelete,
	title,
	description,
	onchangetitle,
	onchangedescription,
}) {
  const styles = {
    grid: {
      margin: "5px 0"
    }
  }

	return (
		<Grid
			container
			direction="column"
			justifyContent="flex-start"
			alignItems="flex-start"
		>
			<Grid md={12} style={styles.grid}>
				<Textfield
					placeholder="input title"
					onChange={onchangetitle}
					defaultValue={title}
				/>
			</Grid>
			<Grid md={12} style={styles.grid}>
				<TextArea
					placeholder="input description"
					onChange={onchangedescription}
					defaultValue={description}
				/>
			</Grid>
			<Grid
        style={styles.grid}
				container
				direction="row"
				justifyContent="flex-start"
				alignItems="flex-start"
			>
				<Grid md={4}>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						size="small"
						onClick={onsave}
					>
						Save
					</Button>
				</Grid>
				<Grid md={4}>
					<Button
						fullWidth
						variant="outlined"
						color="primary"
						size="small"
						onClick={ondone}
					>
						Mark as done
					</Button>
				</Grid>
				<Grid md={4}>
					<Button
						fullWidth
						variant="contained"
						color="secondary"
						size="small"
						onClick={ondelete}
					>
						Delete
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
}
