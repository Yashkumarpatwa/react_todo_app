import React, { useState, useEffect } from "react";
import './App.css';
//importing Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";


function App() {
    //Staye Stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos ] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilterredTodos] = useState([]);
  
 //RUN ONCE WHEN THE APP START
 useEffect(() => {
   getLocalTodos();

 }, []);
  
  
  
  
  //USE EFFECT
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);
  
  //Function
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilterredTodos(todos.filter(todo => todo.completed === true));
        break;
        case 'uncompleted':
        setFilterredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilterredTodos(todos);
        break;
    }
  };
  //Save to local
  const saveLocalTodos = () => {
     localStorage.setItem('todos',JSON.stringify(todos));
   };
  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
   }else{
     let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };
  
  return (
    <div className="App">
      <header>
       <h1>Ed's Todo List </h1>
       </header>
       <Form 
        inputText={inputText}
        todos={todos} 
        setTodos={setTodos}
        setInputText={setInputText} 
        setStatus={setStatus}
         />
       <TodoList
       filteredTodos={filteredTodos}
       setTodos={setTodos}
       todos={todos} 
       />
    </div>
  );
};

export default App;
