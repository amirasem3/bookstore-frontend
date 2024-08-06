const API_URL = "http://localhost:8080/tasks";

export async function fetchTasks(){
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    return response.json();
}

export async function createTask(task) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create task: ${errorText}`);
    }
    const responseBody = await response.json();
    console.log('Response Body:', responseBody); // Debugging log
    return responseBody; // Return the parsed JSON task object
    // return response.json();
}

export async function updateTask(task) {
    const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update task: ${errorText}`);
    }
    const responseBody = await response.json();
    return responseBody; // Return the parsed JSON task object
    // return response.json();
}

export async function deleteTask(id) {
    const response = await fetch(`${API_URL}?id=${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete task: ${errorText}`);
    }
    return true; // Just confirm deletion was successful
}