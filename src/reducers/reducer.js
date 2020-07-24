import initialStore from "./store";
import actions from "./actions";

const getRandomInt = () => {
  return Math.floor(Math.random() * Math.floor(9999));
};

const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case actions.ADD_TODOS:
      return {
        ...state,
        todos: [...state.todos, { id: getRandomInt(), todo: action.payload }],
      };
    case actions.EDIT_TODOS:
    case actions.DELETE_TODOS:
      return {
        ...state,
        todos: state.todos.filter((e) => e.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
