export default localStorage.getItem("todos") !== "null"
  ? JSON.parse(localStorage.getItem("todos"))
  : {
      todos: [],
    };
