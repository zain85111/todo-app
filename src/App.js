import React, {useState, useEffect} from "react";
import "./App.css";

import Form from './components/Form';
import TodoList from "./components/TodoList";

function App() {
  // UseStates
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filterTodos, setFilterTodos] = useState([]);

  // UseEffects
  useEffect(() => {
    getTodosLocal();
  },[])
  useEffect(() => {
    filterHandler();
    saveTodosLocal();
  },[todos,status])

  // Helper Function
  const filterHandler = (e) => {
    switch (status) {
      case 'completed':
        setFilterTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilterTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilterTodos(todos)
        break;
    }
  }

  // Saving Todos Locally
  const saveTodosLocal = () => {    
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  const getTodosLocal = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {

      let localTodos = JSON.parse(localStorage.getItem('todos'))
      setTodos(localTodos);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Zain's Todo App</h1>
      </header>
      <Form todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText} setStatus={setStatus} />
      <TodoList todos={todos} setTodos={ setTodos } filterTodos={ filterTodos }/>
    </div>
  );
}

export default App;
