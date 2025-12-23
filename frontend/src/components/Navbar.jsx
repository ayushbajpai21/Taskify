import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      toast.success("Logged out successfully 👋");
      navigate("/");
    } catch {
      toast.error("Logout failed ❌");
    }
  };

  return (
    <nav
      className="sticky top-0 z-50
      bg-white/10 backdrop-blur-xl border-b border-white/20
      px-6 py-4 flex justify-between items-center
      shadow-[0_0_30px_rgba(59,130,246,0.25)]"
    >
      {/* Logo / Brand */}
      <h1 className="text-2xl font-bold tracking-wide text-transparent bg-clip-text
        bg-gradient-to-r from-blue-400 to-purple-500">
        Taskify
      </h1>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="px-5 py-2 rounded-lg font-semibold text-white
        bg-gradient-to-r from-red-500 to-pink-600
        hover:scale-[1.05]
        hover:shadow-[0_0_20px_rgba(239,68,68,0.8)]
        transition-all duration-300"
      >
        Logout
      </button>
    </nav>
  );
}
