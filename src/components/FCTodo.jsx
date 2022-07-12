import React, { useState } from 'react'
import '../App.css';
import Checkbox from '@mui/material/Checkbox';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function FCTodo(props) {
  let taskData = props.taskData;

  const [anchorEl, setAnchorEl] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [checked, setChecked] = useState(false);

  const [title, setTitle] = useState(taskData.title);
  const [body, setBody] = useState(taskData.body);
  
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    //* near who we want our menu to open
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    //* close our menu
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    //* show dialog box for the full todo note
    setShowDialog(true);
  };

  const handleClickClose = () => {
    //* disable dialog box of the todo note
    setShowDialog(false);
  };

  const handleRemoveTask = () => {
    //* remove clicked task
    //* close the menu
    props.removeTask(taskData);
    handleClose();
  }

  const updateDoneTask = () => {
    //* update task checked mark 
    setChecked(!checked);
    if(taskData.done) {
      taskData.done = false;
    } else {
      taskData.done = true;
    }
    props.updateDoneTask(taskData);
  }

  const handleUpdateTask = () => {
    //* update the rest of the fields (title, body)
    taskData.title = title;
    taskData.body = body;
    props.updateTask(taskData);
    handleClickClose();
  }


  return (
    <div className='todo'>
        <Dialog open={showDialog} onClose={handleClickClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={taskData.title}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Body"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setBody(e.target.value)}
              defaultValue={taskData.body}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickClose}>Cancel</Button>
            <Button onClick={handleUpdateTask}>Change</Button>
          </DialogActions>
        </Dialog>

      <div className='task_comp' onClick={handleClickOpen}>
        <h4>{taskData.title}</h4>
        <h5>
          {taskData.body.length > 15 
          ? taskData.body.slice(0, 15) + '...' 
          : taskData.body}
        </h5>
      </div>

      <Checkbox {...label}
      hidden={!taskData.done}
      id='todoCheckbox'
      color="secondary"
      checked={taskData.done}
      sx={{ '& .MuiSvgIcon-root': { fontSize: 25 } }}
      onClick={updateDoneTask}/>

      <div>
        <h2 
          className='todo_menu_icon' 
          onClick={(e) => handleClick(e)}>=</h2>
          
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={updateDoneTask}>Done/Undone</MenuItem>
          <MenuItem onClick={handleClickOpen}>Rename</MenuItem>
          <MenuItem onClick={handleRemoveTask}>Delete</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

