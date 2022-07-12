import React from 'react'
import { Paper } from '@mui/material';
import FCTodo from './FCTodo';
import '../App.css';

export default function FCTodosBody(props) {
  //* map every task in the todo list and render out todo component
  let todoList = props.tasksData.map((task, key) => 
  <FCTodo 
    key={key} 
    taskData={task} 
    removeTask={props.removeTask} 
    updateTask={props.updateTask}
    updateDoneTask={props.updateDoneTask}/>
);

  return (
    <div style={{width: 400}}>
      <Paper style={{maxHeight: 500, maxWidth: 450, overflow: 'auto'}}>
        <ul style={{listStyle: 'none'}} className='listStyle'>
          {todoList}
        </ul>
      </Paper>
    </div>
  )
}
