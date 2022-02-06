import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const App = () => {
  const firstRender = useRef(true);
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = (e) => {
    e.preventDefault();
    if(inputValue.trim() === '') return;
    
    setTodos([
      ...todos, 
      {
        text: inputValue,
        id: uuidv4(),
      },
    ]);

    setInputValue("");
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  useEffect(() => {
    if(firstRender.current){
      firstRender.current = false;
    } else {
      localStorage.setItem("Todo", JSON.stringify([...todos]));
    }
  },[todos]);

  useEffect(() => {
    if(localStorage.getItem("Todo") !== null) {
      const newTodos = localStorage.getItem("Todo");
      setTodos(JSON.parse([...todos, newTodos]));
    }
  }, []);

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={addTodo}>
          <input
            autoFocus 
            type="text"
            placeholder="Add a todo..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
        {todos.map((todo) => (
          <div key={todo.id} className="todo">
            <p>{todo.text}</p>
            <i onClick={() => removeTodo(todo.id)} className="far fa-trash-alt"></i>
          </div>  
        ))}
      </div>
    </div>
  );
};

export default App;
