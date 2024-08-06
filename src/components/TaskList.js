import React, {useEffect, useState} from "react";
import {fetchTasks, deleteTask} from "../api";

function TaskList({tasks,onEdit, onDelete}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            onDelete(id); // Remove the task from the state in App.js
        } catch (err) {
            console.error('Failed to delete task:', err.message);
        }
    };

    // if (loading) return <div>Loading...</div>;
    if (!tasks || tasks.length === 0) { // Check if tasks is null or empty
        return <div>No tasks available</div>;
    }
    return(
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <li key={task.id}>
                            <span>{task.title || 'Untitled'}</span> {/* Fallback if title is missing */}
                            <button onClick={() => onEdit(task)}>Edit</button>
                            <button onClick={() => handleDelete(task.id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <li>No tasks available</li>
                )}
            </ul>
        </div>
    )
}

export default TaskList;