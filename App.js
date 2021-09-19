// ** #1 and #2 are only inputed once 
// The four user inputs:
// 1. The users name
// 2. The start time and end time of their day (amount of time spent working)
// 2. The activity 
// 3. The amount of time (eg. 15 mins, 30 mins, 45 mins, 60 mins, etc)
// 4. The time of day (9:00am, 10:00am, etc)

import React, { useState } from 'react'
import styled from 'styled-components'

// custom styling using styled-components!
const AppContainer = styled.div`
  margin: 15vh 15vw;
`
const TodoItemContainer = styled.div`
  &:hover > p{
    text-decoration: line-through;
    cursor: pointer;
  }
`

const TodoInput = styled.input`
  padding: 0.7em 0.5em;
  border: 1px solid black;
  border-radius: 20px;

`

function TodoItem(props) {
  return(
    <TodoItemContainer onClick={
      () => {props.delete(props.index)}
    }>
      <p>{props.name}</p>

    </TodoItemContainer>
  )
}

function TaskDurationItems(props) {
  return(
      <p>{props.name}</p>
    
  )
}

function TodoForm(props){
  const [todo, setTodo] = useState("")
  const handleSubmit = (e) =>{
    //prevent form from refreshing page
    e.preventDefault()
    //show alert
    props.addCallback(todo)
    //clear form
    setTodo("")
  }
  return(
    <form onSubmit={handleSubmit}>
      <TodoInput type="text" placeholder="Add a new todo..."value={todo} onChange={e => setTodo(e.target.value)}/>
    </form>
  )
}

function TaskDurationForm(props){
  const [taskDuration, setTaskDuration] = useState(0)
  const handleSubmit = (e) =>{
    //prevent form from refreshing page
    e.preventDefault()
    //show alert
    props.addCallback(taskDuration)
    //clear form
    setTaskDuration(0)
  }
  return(
    <form onSubmit={handleSubmit}>
      <TodoInput type="number" value={taskDuration} onChange={e => setTaskDuration(e.target.value)}/>
    </form>
  )
}

function App() {
  const [todos, setTodos] = useState(["task a", "task b"])//inside usestate are the initial params
  const [taskDurations, setTaskDurations] = useState([0, 1])
  const now = new Date()

  const deleteTask = (index) => {
    var copyTaskDuration = taskDurations.slice()
    var copyTodos = todos.slice()
    copyTodos.splice(index, 1)
    copyTaskDuration.splice(index, 1)
    setTodos(copyTodos)
    setTaskDurations(copyTaskDuration)
  }
  const addTodo = (todo) => {
    const newTodos = [...todos, todo]
    setTodos(newTodos)
  }

  const addTaskDuration = (taskDuration) =>{
    const newTaskDurations = [...taskDurations, taskDuration]
    setTaskDurations(newTaskDurations)
  }
  return (
    <AppContainer>
      <div className="calendar"> 
      {/* <img src="https://source.unsplash.com/user/erondu/1600x900"></img> */}
      <h1> {now.toDateString()}</h1>
      </div>
      <div className="calendar">
        <div className="timeGrid"> </div>
      </div>
      <div className="calendar">
      <div>
      <h1>todos</h1>
      {todos.map((item, i)=> <TodoItem
        key={i}
        name={item}
        delete={deleteTask}
        index={i}
      />)}
      <TodoForm addCallback={addTodo}/>
      </div>
      <div>
      <h1>task duration</h1>
      {taskDurations.map((item, i)=> <TaskDurationItems 
        key={i}
        name={item}
      />)}
      <TaskDurationForm addCallback={addTaskDuration}/>
      </div>
      </div>

    </AppContainer>
  );
}

export default App;
