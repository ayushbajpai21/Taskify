import { useEffect, useState } from "react";
import api from "../api/axios";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Navbar />

      <div className="px-4 py-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-wide mb-2">
            Your Dashboard
          </h1>
          <p className="text-gray-400">
            Stay focused. Stay productive.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard title="Total Tasks" value={total} color="blue" />
          <StatCard title="Completed" value={completed} color="green" />
          <StatCard title="Pending" value={pending} color="purple" />
        </div>

        {/* Task Input */}
        <TaskForm refresh={fetchTasks} />

        {/* Tasks List */}
        <div className="max-w-xl mx-auto mt-6 space-y-4">
          {loading ? (
            <p className="text-center text-gray-400">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <EmptyState />
          ) : (
            tasks.map((task) => (
              <TaskCard key={task._id} task={task} refresh={fetchTasks} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Helper Components ---------- */

function StatCard({ title, value, color }) {
  const colors = {
    blue: "shadow-[0_0_25px_rgba(59,130,246,0.4)]",
    green: "shadow-[0_0_25px_rgba(34,197,94,0.4)]",
    purple: "shadow-[0_0_25px_rgba(168,85,247,0.4)]",
  };

  return (
    <div
      className={`bg-white/10 backdrop-blur-lg border border-white/20
      rounded-xl p-5 text-center transition hover:scale-[1.03]
      ${colors[color]}`}
    >
      <p className="text-gray-400 text-sm uppercase tracking-widest">
        {title}
      </p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center mt-10 text-gray-400">
      <p className="text-lg">No tasks yet 🚀</p>
      <p className="text-sm mt-1">
        Add your first task and start being productive
      </p>
    </div>
  );
}
