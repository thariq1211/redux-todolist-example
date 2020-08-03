import React, { useState, memo } from "react";
import { connect } from "react-redux";
import actions from "./reducers/actions";
import {
  Container,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormGroup,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteOutline";

const connectedApp = connect(
  (state) => {
    return {
      state,
      todos: state.todos,
    };
  },
  (dispatch) => {
    return {
      addTodos: (value) =>
        dispatch({ type: actions.ADD_TODOS, payload: value }),
      deleteTodos: (key) =>
        dispatch({ type: actions.DELETE_TODOS, payload: key }),
    };
  }
)(App);

function App({ todos, addTodos, deleteTodos }) {
  const [todo, setTodo] = useState("");
  const [toast, setToast] = useState(false);
  const addTodosEv = (value) => {
    if (todo !== "") {
      setTodo("");
      addTodos(value);
    } else {
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    }
  };
  return (
    <Container maxWidth="md">
      <center>
        <h1>TODO List</h1>
      </center>
      <FormGroup>
        <Grid container spacing="2">
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={toast}
            message="Input Todo Properly!"
            key={`bottom + center`}
          />
          <Grid item xs="12" md="10">
            <TextField
              fullWidth
              placeholder="Add Todos"
              value={todo}
              onChange={(el) => setTodo(el.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodosEv(todo)}
            />
          </Grid>
          <Grid item xs="12" md="2">
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => addTodosEv(todo)}
            >
              Add
            </Button>
          </Grid>
          <Grid item xs="12" md="12">
            <List dense>
              {todos.length !== 0
                ? todos.map((item) => (
                    <ListItem key={item.id}>
                      <ListItemText>{item.todo}</ListItemText>
                      <ListItemSecondaryAction>
                        <DeleteIcon onClick={() => deleteTodos(item.id)} />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                : "Todolist is Empty!"}
            </List>
          </Grid>
        </Grid>
      </FormGroup>
    </Container>
  );
}

export default memo(connectedApp);
