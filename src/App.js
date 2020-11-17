import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  //state
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  //run once when the app start
  useEffect(()=>{
    getLocalTodos();
  }, []);
  //useeffect
  useEffect(() => {
    filterHandler();
    saveLocal();
    console.log("hey");
  }, [todos, status]);
  
  //func
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  const saveLocal=() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    
  };
  const getLocalTodos=() => {
    if (localStorage.getItem('todos')===null) {
      localStorage.setItem('todos', JSON.stringify([]))
    }else{
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      console.log(todoLocal);
      setTodos(todoLocal);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Cagatay's Todo List</h1>
      </header>
      <Form
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        inputText={inputText}
        setStatus={setStatus}
        filteredTodos={filteredTodos}
      />
      <TodoList
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos}
      />
    </div>
  );
}

export default App;
