import React, { useState, memo, useEffect } from "react";
import moment from "moment";
import { connect } from "react-redux";
import actions from "./reducers/actions";
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  FormGroup,
  Button,
  Snackbar,
  TextField
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";

import TodoField from "./components/Moleculs/ListTodo";
import Modal from "./components/Moleculs/Modal";
import DetailTodo from "./components/DetailTodo";

const connectedApp = connect(
  (state) => {
    return {
      state,
      todos: state?.todos,
      todolist: state?.todolist
    };
  },
  (dispatch) => {
    return {
      initTodo: (value) => 
        dispatch({ type: actions.INIT_TODO, payload: value }),
      addTodos: (value) =>
        dispatch({ type: actions.ADD_TODO, payload: value }),
      deleteTodos: (key) =>
        dispatch({ type: actions.DELETE_TODO, payload: key }),
      editTodos: (key, value) =>
        dispatch({ type: actions.EDIT_TODO, payload: { key, value } }),
    };
  }
)(App);

function App({ todolist, todos, initTodo, addTodos, deleteTodos, editTodos }) {
  const [todo, setTodo] = useState("");
  const [toast, setToast] = useState(false);
  const [isEdit, setIsEdit] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const addTodosEv = (value) => {
    if (todo !== "") {
      setTodo("");
      addTodos(value);
    } else {
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    }
  };

  const timestamp = () => {
    return moment().format("YYYY-MM-DD HH:MM")
  };

  console.log(todolist);

  useEffect(() => {
    fetch("https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list", {
      method: "GET"
    })
    .then(result => result.json())
    .then(response => initTodo(response))
    .catch(ex => console.error(ex))
  }, []);

  useEffect(() => {
    setIsEdit(todos?.map((item) => ({ id: item.id, status: false })));
  }, [todos]);

  console.log(todolist);

  return (
    <Container maxWidth="md">
      <Modal title={"Edit Todo"} open={openModal} onClose={() => setOpenModal(prev => !prev)}>
        <DetailTodo title={"ini title"} description={"ini description"} />
      </Modal>
      <center>
        <h2>TODO List</h2>
      </center>
      <FormGroup>
        <Grid container spacing={2}>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={toast}
            message="Input Todo Properly!"
            key={`bottom + center`}
          />
          <Grid item xs={12} md={10}>
            <TextField
              fullWidth
              placeholder="Add Todo"
              value={todo}
              onChange={(el) => setTodo(el.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodosEv(todo)}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => addTodosEv(todo)}
            >
              Add
            </Button>
          </Grid>
          <Grid item xs={12} md={12}>
            <List dense>
              {todolist
                ? todolist?.filter(e => e.status === 0).map((item) => (
                    <ListItem key={item.id}>
                      <TodoField
                        onClick={() => setOpenModal(prev => !prev)}
                        status={item.status}
                        disabled={
                          !isEdit.filter((i) => i.id === item.id)[0]?.status
                        }
                        title={item.title}
                        description={item.description}
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
                      ></TodoField>
                      {/* <ListItemSecondaryAction>
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
                      </ListItemSecondaryAction> */}
                    </ListItem>
                  ))
                : "Todolist is Empty!"}
            </List>
          </Grid>
          <Grid item xs={12} md={12}>
            <List dense>
              {todolist
                ? todolist?.filter(e => e.status !== 0).map((item) => (
                    <ListItem key={item.id}>
                      <TodoField
                        onClick={() => setOpenModal(prev => !prev)}
                        status={item.status}
                        disabled={
                          !isEdit.filter((i) => i.id === item.id)[0]?.status
                        }
                        title={item.title}
                        description={item.description}
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
                      ></TodoField>
                      {/* <ListItemSecondaryAction>
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
                      </ListItemSecondaryAction> */}
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

export default memo(connectedApp);
