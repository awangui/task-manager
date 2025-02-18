import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks]=useState(()=>{
    return JSON.parse(localStorage.getItem("tasks"))||
    [];
  });
  const [newTask, setNewTask]= useState("");
  const [darkMode, setDarkMode]=useState(false);
  //function to add a new task
  const addTask=()=>{
    if(newTask.trim() !== ""){//make sure task is not empty
      setTasks([...tasks,{text:newTask, completed:false}])
      setNewTask("")//clear input after adding task
    }
  }
  //load tasks
  useEffect(()=>{
    localStorage.setItem("tasks", JSON.stringify(tasks));
  },[tasks]);
  //function to delete task
  const deleteTask=(index)=>{
    const filteredTasks=tasks.filter((_,i)=> i !==index)
    setTasks(filteredTasks);
  }
  //function to toggle task completion
  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }
  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
        <span className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️" : "🌙 "}
      </span>
      <h1>Task Manager 📝</h1>
      <p>Track your tasks with ease!</p>
    
    {/* form to add a task */}
      <div className='input-form'>
        <label value="Add new task:" ></label>
        <input type="text"
        value={newTask}
        onChange={(e)=>setNewTask(e.target.value)}
        >
        </input>
        <button type='submit' onClick={addTask}>Add</button>
      </div>

      {/* tasklist */}
      <div className='task-list'>
        <ul>
          {tasks.map((task, index)=>(
             <li key={index} className={task.completed ? "completed" : ""}>
              <span  className='number'>{index +1}</span>
              <span onClick={() => toggleTask(index)} className='task'>{task.text}</span>
            <button onClick={()=>deleteTask(index)}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
