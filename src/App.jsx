import { useState, useEffect } from "react";

import {
  fetchTasks,
  createNewTask,
  editTask,
  deleteTask,
} from "../frontend-api";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

import Hero from "./Hero";

const queryClient = new QueryClient();

function App() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  const [isDone, setIsDone] = useState([]); // Tracks completed tasks
  const [newTask, setNewTask] = useState("");
  const [completionTime, setCompletionTime] = useState({}); // Stores completion time per task
  const [date, setDate] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(""); // To track which task is being edited
  const [editedTaskTitle, setEditedTaskTitle] = useState(""); // To store the new title for the task

  const [todo, setTodo] = useState([]); // Track local tasks

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("todo");
    if (storedTasks) {
      setTodo(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(todo));
  }, [todo]);

  // All of the task

  const {
    data: tasks = [],
    isLoading,
    isFetching,
    refetch,
    error,
  } = useQuery({
    queryKey: ["taskList"],
    queryFn: fetchTasks,
    onSuccess: (data) => {
      console.log("Fetched tasks:", data);
    },
  });

  // Create a new task

  const createMutation = useMutation({
    mutationFn: createNewTask,
    onSuccess: (newTask) => {
      const updatedTodo = [...todo, newTask];
      setTodo(updatedTodo);
      queryClient.invalidateQueries({
        queryKey: ["taskList"],
      });
    },
  });

  // Edit a task

  const editMutation = useMutation({
    mutationFn: editTask,
    onSuccess: (updatedTodo) => {
      const updatedTodos = todo.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      setTodo(updatedTodos);
      queryClient.invalidateQueries({
        queryKey: ["taskList"],
      });
      refetch();
      setEditingTaskId(null); // Reset editing task ID
      setEditedTaskTitle(""); // Clear edited title
    },
  });

  // Delete a task

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (id) => {
      const updatedTasks = tasks.filter((tasks) => tasks.id !== id);
      setTodo(updatedTasks);
      queryClient.invalidateQueries({
        queryKey: ["taskList"],
      });
      refetch();
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (id, title, taskDate) => {
    // Set the editing task ID and title
    setEditingTaskId(id);
    setEditedTaskTitle(title || "");
    setDate(taskDate);
  };

  const handleEditSubmit = (e, id) => {
    e.preventDefault();

    // Find the current task to retain its created_at if not modified
    const currentTask = tasks.find((task) => task.id === id);

    // Use the existing created_at date if it's not changed (if date input is empty)
    const updatedDate = date || currentTask.created_at;

    editMutation.mutate({
      title: editedTaskTitle,
      created_at: updatedDate,
      id,
    });
    setEditingTaskId(null); // Reset after submission
    setEditedTaskTitle(""); // Clear the title
    setDate("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createMutation.mutate(
      {
        title: newTask,
        completed: false,
        created_at: date,
      },
      {
        onSuccess: () => {
          refetch(); // Manually refetch the tasks after a successful mutation
        },
      }
    );
    setNewTask("");
    setDate("");
  };

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <p>Error could not fetch data: {error.message}</p>;
  }

  if (isFetching) {
    console.log("Fetching updated tasks...");
  }

  const handleIsDone = (id) => {
    const now = new Date();
    const day = now.toLocaleDateString();
    const hour = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (isDone.includes(id)) {
      // Remove task from done list and clear completion time
      setIsDone(isDone.filter((taskId) => taskId !== id));
      setCompletionTime((prev) => {
        const newCompletionTime = { ...prev };
        delete newCompletionTime[id];
        return newCompletionTime;
      });
    } else {
      // Mark task as done and record completion time
      setIsDone([...isDone, id]);
      setCompletionTime((prev) => ({
        ...prev,
        [id]: `You completed the task in - ${hour}, ${day}`,
      }));
    }
  };

  return (
    <>
      <Hero />
      <div
        className=" pt-6 pb-2 h-screen flex flex-col justify-center items-center bg-gray-800  md:max-w-md"
        id="newtask"
      >
        <h2 className="text-2xl  font-bold text-gray-100 mb-4 md:mb-6 text-center">
          My Tasks for <span className="text-gray-400">{formattedDate}</span>
        </h2>

        <section className="bg-gray-900 text-gray-200 rounded-lg shadow-lg p-6 md:p-4 w-full max-w-screen-sm md:max-w-md lg:max-w-lg ">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-200 mb-6 md:mb-10 text-center">
            Set a new task
          </h2>
          <form
            className="space-y-4 md:space-y-6 max-w-md mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg">
              <label className="block mb-2 text-base md:text-lg font-semibold text-gray-100">
                Task:
              </label>
              <input
                type="text"
                value={newTask}
                name="newTask"
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter task title"
                className="bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 md:p-4 transition duration-200 ease-in-out hover:bg-gray-600"
                required
              />
            </div>

            <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg">
              <label className="block mb-2 text-base md:text-lg font-semibold text-gray-100">
                Date:
              </label>
              <input
                type="text"
                value={date}
                name="date"
                onChange={(e) => setDate(e.target.value)}
                placeholder="Enter yyyy-mm-dd"
                className="bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 transition duration-200 ease-in-out hover:bg-gray-600"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg px-4 py-2 md:px-6 md:py-3 transition duration-200 ease-in-out"
            >
              Add Task
            </button>
          </form>
        </section>
      </div>

      <section className="max-w-screen-lg mt-10 mb-10 pt-10 pb-10 mx-auto p-6 h-screen flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Tasks
        </h2>
        <ul className="mt-6 overflow-y-auto max-h-[400px]  space-y-4 flex-grow md:grid md-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <li
              className="mb-10 p-4 sm:p-6  bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-transform duration-200"
              key={task.id}
            >
              {editingTaskId === task.id ? (
                <form onSubmit={(e) => handleEditSubmit(e, task.id)}>
                  <input
                    type="text"
                    value={editedTaskTitle}
                    onChange={(e) => setEditedTaskTitle(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    required
                  />
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingTaskId(null)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <p
                    className={`text-lg font-medium ${
                      isDone.includes(task.id)
                        ? "line-through text-gray-500"
                        : ""
                    }`}
                    style={{
                      textDecoration: isDone.includes(task.id)
                        ? "line-through"
                        : "none",
                    }}
                  >
                    Task: {task.title}
                  </p>

                  <div className="flex space-x-2 mt-2">
                    <button
                      className="text-white bg-blue-700 py-1 px-3 rounded-lg hover:bg-blue-800"
                      onClick={() => handleIsDone(task.id)}
                    >
                      {isDone.includes(task.id) ? "Not complete" : "Done"}
                    </button>
                    <button
                      className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600"
                      onClick={() => handleEdit(task.id, task.title)}
                    >
                      Edit Task
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                  </div>

                  <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
                    <p className="text-sm text-gray-700">
                      <strong className="mr-1">Created on:</strong>
                      {task.created_at}
                    </p>
                    {isDone.includes(task.id) && (
                      <p className="text-sm text-green-700 mt-2">
                        <strong className="mr-1">Completed:</strong>
                        {completionTime[task.id]}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default App;
