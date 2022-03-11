import "./App.css";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
	Container,
	Typography,
	FormGroup,
	Grid,
	List,
	ListItem,
	Snackbar,
	Button,
} from "@material-ui/core";

import actions from "./reducers/actions";
import TodoField from "./components/moleculs/ListTodo";
import Modal from "./components/moleculs/Modal";
import ModalTodo from "./components/ModalTodo";

const connectApp = connect(
	(state) => {
		return {
			state,
		};
	},
	(dispatch) => {
		return {
			initTodo: (value) =>
				dispatch({ type: actions.INIT_TODO, payload: value }),
			addTodo: (value) => dispatch({ type: actions.ADD_TODO, payload: value }),
			deleteTodo: (key) =>
				dispatch({ type: actions.DELETE_TODO, payload: key }),
			markDone: (key) => dispatch({ type: actions.MARK_DONE, payload: key }),
			editTodo: (key, value) =>
				dispatch({
					type: actions.EDIT_TODO,
					payload: { key, title: value.title, description: value.description },
				}),
		};
	}
);

function App(props) {
	const { state, addTodo, initTodo, deleteTodo, markDone, editTodo } = props;
	const { todolist } = state;
	const [openAddModal, setOpenAddModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [editData, setEditData] = useState({});
	const [toast, setToast] = useState(false);

	const onCloseAddModal = () => {
		setOpenAddModal((prev) => !prev);
	};

	const onOpenAddModal = () => {
		setOpenAddModal((prev) => !prev);
	};

	const onsavemodaladd = (value) => {
		if (value.description !== "" && value.title !== "") {
			addTodo(value);
			setOpenAddModal((prev) => !prev);
		} else {
			setToast(true);
			setTimeout(() => setToast(false), 3000);
		}
	};

	const onOpenEditModal = (item) => {
		return (ev) => {
			setOpenEditModal((prev) => !prev);
			setEditData(item);
		};
	};

	const onCloseEditModal = () => {
		setOpenEditModal((prev) => !prev);
		setEditData({});
	};

	const ondeletebutton = () => {
		deleteTodo(editData.id);
		onCloseEditModal();
	};

	const onmarkdone = () => {
		markDone(editData.id);
		onCloseEditModal();
	};

	const onsavemodaledit = (value) => {
		editTodo(editData.id, {
			title: value.title,
			description: value.description,
		});
		onCloseEditModal();
	};

	const sortTaskUnDone = () => {
		const todolistundone = todolist.filter((item) => item.status === 0);
		const convertdate = todolistundone.map((item) => ({
			...item,
			createdAt: new Date(item.createdAt),
		}));
		const sort = convertdate.sort((a, b) => a.createdAt - b.createdAt);
		return sort;
	};

	const sortTaskDone = () => {
		const todolistdone = todolist.filter((item) => item.status === 1);
		const convertdate = todolistdone.map((item) => ({
			...item,
			createdAt: new Date(item.createdAt),
		}));
		const sort = convertdate.sort((a, b) => b.createdAt - a.createdAt);
		return sort;
	};

	useEffect(() => {
		const intializefetchAPI = async () => {
			try {
				const url =
					"https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list";
				const request = await fetch(url, {
					method: "GET",
				});
				const response = await request.json();
				initTodo(response);
			} catch (error) {
				console.error(error);
			}
		};
		intializefetchAPI();
	}, []);

	return (
		<Container maxWidth="md">
			<Modal title="Edit Todo" open={openEditModal} onClose={onCloseEditModal}>
				<ModalTodo
					mode="edit"
					ondelete={ondeletebutton}
					ondone={onmarkdone}
					onsave={onsavemodaledit}
					title={editData.title}
					description={editData.description}
					status={editData.status}
				/>
			</Modal>
			<Modal title="Add Todo" open={openAddModal} onClose={onCloseAddModal}>
				<ModalTodo onsave={onsavemodaladd} mode="add" />
			</Modal>
			<center>
				<Typography variant="h4">Todo-list App</Typography>
			</center>
			<FormGroup>
				<Grid container spacing={2}>
					<Snackbar
						anchorOrigin={{ vertical: "top", horizontal: "right" }}
						open={toast}
						message="Input Todo Properly!"
						key={`bottom + center`}
					/>
					<Grid item xs={12} md={12}>
						<Button
							fullWidth
							variant="outlined"
							color="primary"
							onClick={onOpenAddModal}
						>
							Add
						</Button>
					</Grid>
					<Grid item xs={12} md={12}>
						<Typography variant="body1">Task undone</Typography>
						<List dense>
							{sortTaskUnDone().length > 0
								? sortTaskUnDone().map((item) => (
										<ListItem key={item.id}>
											<TodoField
												onClick={onOpenEditModal(item)}
												status={item.status}
												title={item.title}
												description={item.description}
											></TodoField>
										</ListItem>
								  ))
								: "Todolist is Empty!"}
						</List>
					</Grid>
					<Grid item xs={12} md={12}>
						<Typography variant="body1">Task done</Typography>
						<List dense>
							{sortTaskDone()?.length > 0
								? sortTaskDone().map((item) => (
										<ListItem key={item.id}>
											<TodoField
												onClick={onOpenEditModal(item)}
												status={item.status}
												title={item.title}
												description={item.description}
											></TodoField>
										</ListItem>
								  ))
								: "Todolist done is Empty!"}
						</List>
					</Grid>
				</Grid>
			</FormGroup>
		</Container>
	);
}

export default connectApp(App);
