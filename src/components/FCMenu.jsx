import React, { useEffect, useState } from 'react'
import FCTodosBody from './FCTodosBody';
import FCHeader from './FCHeader';
import FCAdd from './FCAdd';

export default function FCMenu(props) {
  let curUserEmail = props.userData.email;

  const [todoList, setTodoList] = useState([]);
  const [todosLength, setTodosLength] = useState(0);

  const addTask = (title, body) => {
    //* add new Task for current user
    if(title === null || body === null) {
      alert("Title or body is empty.");
      return;
    }
    let newTodoList = [
      {
        id: todoList.length,
        done: false,
        title: title,
        body: body
      }, ...todoList
    ]
    setTodoList(newTodoList);
    setTodosLength(todosLength + 1);

    //* upload the new todoList to localStorage
    localStorage.setItem(curUserEmail, JSON.stringify(newTodoList));
  };

  useEffect(() => {
    //* get logged in user todo list
    const curUserTodosList = JSON.parse(localStorage.getItem(curUserEmail));
    if(curUserTodosList !== null) {
      setTodoList(curUserTodosList);
    }
  }, [props])

  const removeTask = (task) => {
    //* remove task and update local storage
    let newTodoList = todoList.filter((todo) => todo.id !== task.id);
    setTodoList(newTodoList);
    localStorage.setItem(curUserEmail, JSON.stringify(newTodoList));
  };

  const updateDoneTask = (task) => {
    //* update if user done his task or not
    let updatedList = todoList.map((todo) => {
      if(todo.id === task.id) {
        return {...todo, done: task.done};
      }
      return todo;
    });
   
    setTodoList(updatedList);
    localStorage.setItem(curUserEmail, JSON.stringify(updatedList));
  }

  const updateTask = (task) => {
    //* update the fields of the user selected task

    let updatedList = todoList.map((todo) => {
      if(todo.id === task.id) {
        return task;
      }
      return todo;
    });
   
    setTodoList(updatedList);
    localStorage.setItem(curUserEmail, JSON.stringify(updatedList));
  };

  return (
    <div className='menu_container'>
      <FCHeader/>

      <FCTodosBody tasksData={todoList} updateTask={updateTask} updateDoneTask={updateDoneTask} removeTask={removeTask}/>

      <FCAdd addTask={addTask}/>
    </div>
  )
}
