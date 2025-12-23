import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function TaskForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Task title cannot be empty");
      return;
    }

    try {
      setLoading(true);
      await api.post("/tasks", { title });
      toast.success("Task added ✨");
      setTitle("");
      refresh();
    } catch {
      toast.error("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={addTask}
      className="max-w-xl mx-auto flex items-center gap-3
      bg-white/10 backdrop-blur-lg border border-white/20
      rounded-xl px-4 py-3
      shadow-[0_0_20px_rgba(59,130,246,0.25)]
      transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.45)]"
    >
      <input
        type="text"
        placeholder="What’s your next task?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
        className="flex-1 bg-transparent text-white placeholder-gray-400
        focus:outline-none text-lg"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-green-500 to-blue-600
        text-white px-6 py-2 rounded-lg font-semibold
        hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(34,197,94,0.8)]
        transition-all duration-300 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
