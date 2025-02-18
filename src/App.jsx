import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks]=useState([]);
  const [newTask, setNewTask]= useState("");
  //function to add a new task
  const addTask=()=>{
    if(newTask.trim() !== ""){//make sure task is not empty
      setTasks([...tasks,{text:newTask, completed:false}])
      setNewTask("")//clear input after adding task
    }
  }
  //function to delete task
  const deleteTask=(index)=>{
    const filteredTasks=tasks.filter((_,i)=> i !==index)
    setTasks(filteredTasks);
  }
  //function to toggle task completion
  const toggleTask = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  return (
    <div className='app'>
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
            <li key={index}>
              <span  className='number'>{index +1}</span>
              <span onClick={() => toggleTask(index)}>{task.text}</span>
            <button onClick={()=>deleteTask(index)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
