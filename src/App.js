import React, {useEffect, useState} from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import './App.css';
import {fetchTasks} from "./api";

function App() {
    const [tasks, setTasks] = useState([]); // Main state for tasks
    const [editingTask, setEditingTask] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        async function loadTasks() {
            try {
                const data = await fetchTasks();
                setTasks(data);
            } catch (err) {
                setError(err.message);
            }
        }
        loadTasks();
    }, []);

  const handleEdit = (task) => {
    setEditingTask(task);
  };
  const handleSave = () =>{
    setEditingTask(null);
  };
    const handleUpdate = (updatedTask) => {
        console.log("Updated Task:", updatedTask); // Debugging log
        setTasks(prevTasks => {
            const index = prevTasks.findIndex(t => t.id === updatedTask.id);
            if (index !== -1) {
                const newTasks = [...prevTasks];
                newTasks[index] = updatedTask;
                return newTasks;
            } else {
                return [...prevTasks, updatedTask];
            }
        });
    };
    const handleDelete = (deletedTaskId) => {
        // You can perform additional actions here if needed after deletion
        setTasks(prevTasks => prevTasks.filter(task => task.id !== deletedTaskId))
    };


    if (error) return <div>Error: {error}</div>;

    return (
   <div>
     <h1>Task Management System</h1>
     <TaskForm task={editingTask} onSave={handleSave} onUpdate={handleUpdate}/>
     <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete}/>
   </div>
  );
}

export default App;
