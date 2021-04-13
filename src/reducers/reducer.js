import initialStore from "./store";
import actions from "./actions";

const getRandomInt = () => {
  return Math.floor(Math.random() * Math.floor(9999));
};

const pushStorage = (value) => {
  localStorage.setItem("todos", JSON.stringify(value));
  return value;
};

const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case actions.ADD_TODOS:
      return pushStorage({
        ...state,
        todos: [...state.todos, { id: getRandomInt(), todo: action.payload }],
      });
    case actions.EDIT_TODOS:
      const currentState = state.todos;
      const payload = action.payload;
      const newState = currentState.map((item) => {
        return item.id === payload.key
          ? { ...item, todo: payload.value }
          : item;
      });
      return pushStorage({ ...state, todos: newState });
    case actions.DELETE_TODOS:
      const deleteTodos = {
        ...state,
        todos: state.todos.filter((e) => e.id !== action.payload),
      };
      return pushStorage(deleteTodos);
    default:
      return pushStorage(state);
  }
};

export default reducer;
