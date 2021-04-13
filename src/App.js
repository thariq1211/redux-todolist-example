import React, { useState, memo, useEffect } from "react";
import { connect } from "react-redux";
import actions from "./reducers/actions";
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  FormGroup,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";

const connectedApp = connect(
  (state) => {
    return {
      state,
      todos: state?.todos,
    };
  },
  (dispatch) => {
    return {
      addTodos: (value) =>
        dispatch({ type: actions.ADD_TODOS, payload: value }),
      deleteTodos: (key) =>
        dispatch({ type: actions.DELETE_TODOS, payload: key }),
      editTodos: (key, value) =>
        dispatch({ type: actions.EDIT_TODOS, payload: { key, value } }),
    };
  }
)(App);

function App({ todos, addTodos, deleteTodos, editTodos }) {
  const [todo, setTodo] = useState("");
  const [toast, setToast] = useState(false);
  const [isEdit, setIsEdit] = useState([]);
  const addTodosEv = (value) => {
    if (todo !== "") {
      setTodo("");
      addTodos(value);
    } else {
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    }
  };
  useEffect(() => {
    setIsEdit(todos?.map((item) => ({ id: item.id, status: false })));
  }, [todos]);
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
              {todos?.length !== 0
                ? todos?.map((item) => (
                    <ListItem key={item.id}>
                      <TextField
                        style={{ width: "90%" }}
                        disabled={
                          !isEdit.filter((i) => i.id === item.id)[0]?.status
                        }
                        size="small"
                        variant="outlined"
                        defaultValue={item.todo}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            editTodos(item.id, e.target.value);
                            setIsEdit((prevEdit) =>
                              prevEdit.map((val) => {
                                return val.id === item.id
                                  ? { ...val, status: !val.status }
                                  : val;
                              })
                            );
                          }
                        }}
                      ></TextField>
                      <ListItemSecondaryAction>
                        <EditIcon
                          onClick={() =>
                            setIsEdit((prevEdit) =>
                              prevEdit.map((val) => {
                                return val.id === item.id
                                  ? { ...val, status: !val.status }
                                  : val;
                              })
                            )
                          }
                        />
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
