import initialStore from "./store";
import actions from "./actions";
import moment from "moment";

const getRandomInt = () => {
	return Math.floor(Math.random() * Math.floor(999));
};

const timestamp = () => {
	return moment().format("YYYY-MM-DD HH:MM");
};

const pushStorage = (value) => {
	localStorage.setItem("todos", JSON.stringify(value));
	return value;
};

const reducer = (state = initialStore, action) => {
	switch (action.type) {
		case actions.INIT_TODO:
			return pushStorage({ ...state, todolist: action.payload });
		case actions.ADD_TODO:
			return pushStorage({
				...state,
				todolist: [
					...state.todolist,
					{
						id: getRandomInt(),
						title: action.payload.title,
						description: action.payload.description,
						status: 0,
						createdAt: timestamp(),
					},
				],
			});
		case actions.MARK_DONE:
			const todolist = state.todolist;
			const id = action.payload;
			const { status } = todolist.find((item) => item.id === id);
			const newValue = todolist.map((item) => {
				return item.id === id
					? { ...item, status: status === 1 ? 0 : 1 }
					: item;
			});
			return pushStorage({
				...state,
				todolist: newValue,
			});
		case actions.EDIT_TODO:
			const currentState = state.todolist;
			const payload = action.payload;
			const newState = currentState.map((item) => {
				return item.id === payload.key
					? { ...item, title: payload.title, description: payload.description }
					: item;
			});
			return pushStorage({ ...state, todolist: newState });
		case actions.DELETE_TODO:
			const deleteTodos = {
				...state,
				todolist: state.todolist.filter((e) => e.id !== action.payload),
			};
			return pushStorage(deleteTodos);
		default:
			return pushStorage(state);
	}
};

export default reducer;
