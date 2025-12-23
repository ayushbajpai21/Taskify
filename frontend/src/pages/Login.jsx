import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/login", { email, password });
      toast.success("Login successful 🚀");
      navigate("/dashboard");
    } catch {
      toast.error("Invalid credentials ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      
      {/* Smoky Glow Background */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px] animate-pulse"></div>

      {/* Login Card */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-[90%] max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(59,130,246,0.4)] 
        animate-fadeIn"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Taskify
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Sign in to manage your tasks
        </p>

        <input
          type="email"
          placeholder="Email address"
          className="w-full bg-black/40 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full bg-black/40 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 mb-5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold tracking-wide
          hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(99,102,241,0.8)]
          transition-all duration-300"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-center text-gray-300 text-sm mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
