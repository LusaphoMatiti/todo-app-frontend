import axios from "axios";

const api_url = axios.create({
  baseURL: "https://todo-app-backend-production-f1f0.up.railway.app/",
});

// Get all tasks
export const fetchTasks = async () => {
  const fetchData = await api_url.get("/tasks");
  return fetchData.data;
};

// Create a new task
export const createNewTask = async ({ title, completed, created_at }) => {
  const createTask = await api_url.post("/tasks", {
    title,
    completed,
    created_at,
  });
  return createTask.data;
};

//Edit the task
export const editTask = async ({ title, created_at, id }) => {
  const editTodo = await api_url.put(`/tasks/${id}`, { title, created_at });
  return editTodo.data;
};

// Delete the task
export const deleteTask = async (id) => {
  const deletedtask = await api_url.delete(`/tasks/${id}`);
  return deletedtask.data;
};
