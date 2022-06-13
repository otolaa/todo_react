import {useState, useEffect} from 'react'
import ToDo from './ToDo'
import ToDoForm from './ToDoForm'

function App() {
  const [todos, setTodos] =  useState([]);
  const [defaultID, setDefaultID] =  useState('');

  useEffect(()=>{
    const raw_ = localStorage.getItem('todos') || []
    if (raw_.length)
      setTodos(JSON.parse(raw_))  /* JSON.parse([]) - выдает ошибку (Uncaught SyntaxError: Unexpected end of JSON input) */
  }, [])

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTask = (userInput) => {
    if (!userInput)
      return false;

    /* если есть defaultID то обновляем  и т.д. */
    if (defaultID)  {
      setTodos([...todos.map((todo) => 
          todo.id === defaultID ? { ...todo, task: userInput } : {...todo })])
    } else {
      /* добавление элемента */
      let newItem = {
        id: Math.random().toString(36).substr(2,9),
        task: userInput,
        complete: false,
        date: false,
      }
      setTodos([...todos, newItem])      
    }
    
    /* обнуляем данные */
    setDefaultID('')
  }

  const sortTask = (id, up_down) => {
    console.log(id, up_down);
    setTodos([...todos])
  }

  const dateTask = (id) => {
    console.log(id);
  }

  const updateTask = (id) => {
      if (todos.find((todo) => todo.id === id)) {
        setDefaultID(todos.find((todo) => todo.id === id).id);
      }
  }

  const removeTask = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)])
  }
  
  const toggleTask = (id) => {
    setTodos([
      ...todos.map((todo) => 
        todo.id === id ? { ...todo, complete: !todo.complete } : {...todo }
      )
    ])
  }

  console.log(defaultID);
  console.log(todos);
  return (
    <div className="App">
      <header>
        <h1>Todo list react:&nbsp;{todos.length}</h1>
      </header>
      <ToDoForm 
        addTask={addTask}
        defaultInput={todos.find((todo) => todo.id === defaultID)?.task}
      />
      {todos.map((todo)=>{
          return (
            <ToDo
              todo={todo}
              key={todo.id}
              toggleTask={toggleTask}
              removeTask={removeTask}
              updateTask={updateTask}
              sortTask={sortTask}
              dateTask={dateTask}
            />
          )
      })}
    </div>
  )
}

export default App
