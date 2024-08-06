import React , {useState} from "react";
import {createTask, updateTask} from "../api";

function TaskForm({task, onSave, onUpdate}){
    const [title, setTitle] = useState(task? task.title : '');
    const [description, setDescription] = useState(task? task.description : '');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = {id: task ? task.id : undefined, title, description, completed:false};

        try {
            let updateTasks;
            if (task){
              updateTasks =   await updateTask(newTask);
            }else {
               updateTasks =  await createTask(newTask);
            }
            onUpdate(updateTasks);
            onSave();
        }catch (error){
            console.error('Failed to save task:', error);
            setError(error.message);
        }


    };

    return(
        <form onSubmit={handleSubmit}>
            <h2>{task ? 'Edit Task' : 'Create Task'}</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required/>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
                />
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <button type="submit">Save</button>
        </form>
    )
}

export default TaskForm;