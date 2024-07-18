"use client";

import { useEffect, useState } from "react";
import { MdClose, MdDelete, MdEdit } from "react-icons/md";

type Task = {
  id: string;
  title: string;
  description: string;
};

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Initialize tasks from localStorage, or default to an empty array
    if (typeof window !== "undefined") {
      const storedTasks = localStorage.getItem("tasks");
      return storedTasks ? JSON.parse(storedTasks) : [];
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editTaskDescription, setEditTaskDescription] = useState("");

  // Update localStorage whenever tasks state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    setShowForm(true);
    setEditTaskId(null);
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  const editTask = (id: string) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setEditTaskId(id);
      setEditTaskTitle(taskToEdit.title);
      setEditTaskDescription(taskToEdit.description);
      setShowForm(true);
    }
  };

  const handleClose = () => {
    setShowForm(false);
    setEditTaskId(null);
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editTaskId) {
      // Update existing task
      const updatedTasks =
        tasks &&
        tasks.map((task) =>
          task.id === editTaskId
            ? {
                ...task,
                title: editTaskTitle,
                description: editTaskDescription,
              }
            : task,
        );
      setTasks(updatedTasks);
    } else {
      // Create a new task
      const newTask: Task = {
        id: String(tasks.length + 1),
        title: newTaskTitle,
        description: newTaskDescription,
      };
      setTasks([...tasks, newTask]);
    }

    // Reset form state
    setNewTaskTitle("");
    setNewTaskDescription("");
    setEditTaskId(null);

    // Hide the form
    setShowForm(false);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="relative">
      <h1 className="mb-4 text-2xl font-bold">Task Management</h1>
      <button onClick={addTask} className="rounded bg-green-500 px-4 py-2 text-white">
        Add Task
      </button>

      {showForm && (
        <form onSubmit={handleFormSubmit} className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-slate-950 bg-opacity-50">
          <div className="relative rounded bg-white p-8 shadow-lg dark:shadow-white">
            <div className="absolute right-4 top-4">
              <button type="button" onClick={handleClose} className="text-red-500">
                <MdClose size={24} />
              </button>
            </div>
            <h2 className="mb-4 text-xl font-bold">{editTaskId ? "Edit Task" : "Add New Task"}</h2>
            <input type="text" placeholder="Enter title" value={editTaskId ? editTaskTitle : newTaskTitle} onChange={editTaskId ? (e) => setEditTaskTitle(e.target.value) : (e) => setNewTaskTitle(e.target.value)} className="mb-4 w-full border border-gray-300 px-2 py-1" required />
            <textarea placeholder="Enter description" value={editTaskId ? editTaskDescription : newTaskDescription} onChange={editTaskId ? (e) => setEditTaskDescription(e.target.value) : (e) => setNewTaskDescription(e.target.value)} className="mb-4 w-full border border-gray-300 px-2 py-1" rows={4} required />
            <div className="flex justify-between">
              <button type="button" onClick={handleClose} className="rounded bg-red-500 px-4 py-2 text-white">
                Cancel
              </button>
              <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
                {editTaskId ? "Save Changes" : "Submit"}
              </button>
            </div>
          </div>
        </form>
      )}

      <ul className="mt-4">
        {tasks &&
          tasks.map((task) => (
            <li key={task.id} className="flex justify-between border-b p-2">
              <div>
                <h3 className="font-bold">{task.title}</h3>
                <p>{task.description}</p>
              </div>
              <div>
                <button onClick={() => editTask(task.id)} className="mr-2 text-blue-500">
                  <MdEdit size={24} />
                </button>
                <button onClick={() => deleteTask(task.id)} className="text-red-500">
                  <MdDelete size={24} />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Tasks;
