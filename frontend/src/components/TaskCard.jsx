import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

function TaskCard({ task, refresh }) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [loading, setLoading] = useState(false);

  const updateTask = async () => {
    if (!title.trim()) return;
    setLoading(true);
    await api.put(`/tasks/${task._id}`, {
      title,
      completed: task.completed,
    });
    toast.success("Task updated ✨");
    setEdit(false);
    setLoading(false);
    refresh();
  };

  const toggleComplete = async () => {
    setLoading(true);
    await api.put(`/tasks/${task._id}`, {
      completed: !task.completed,
    });
    toast.success(task.completed ? "Marked incomplete" : "Task completed 🎯");
    setLoading(false);
    refresh();
  };

  const deleteTask = async () => {
    setLoading(true);
    await api.delete(`/tasks/${task._id}`);
    toast.success("Task deleted 🗑️");
    setLoading(false);
    refresh();
  };

  return (
    <div
      className={`relative group w-full rounded-xl p-4 flex justify-between items-center
      bg-white/10 backdrop-blur-lg border border-white/20
      transition-all duration-300 hover:scale-[1.02]
      ${
        task.completed
          ? "shadow-[0_0_20px_rgba(34,197,94,0.4)]"
          : "hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
      }`}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleComplete}
          disabled={loading}
          className="accent-green-500 w-5 h-5 cursor-pointer"
        />

        {edit ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-black/40 text-white border border-gray-600 rounded-lg px-2 py-1
            focus:outline-none focus:border-blue-500 transition"
          />
        ) : (
          <span
            className={`text-white font-medium transition-all
            ${
              task.completed
                ? "line-through text-green-400 opacity-80"
                : "group-hover:text-blue-300"
            }`}
          >
            {task.title}
          </span>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition">
        {edit ? (
          <button
            onClick={updateTask}
            disabled={loading}
            className="text-green-400 hover:text-green-300 font-semibold"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        ) : (
          <button
            onClick={() => setEdit(true)}
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Edit
          </button>
        )}

        <button
          onClick={deleteTask}
          disabled={loading}
          className="text-red-400 hover:text-red-300 font-semibold"
        >
          Delete
        </button>
      </div>

      {/* Neon Border */}
      <span className="absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-500/40 pointer-events-none"></span>
    </div>
  );
}

export default TaskCard;
