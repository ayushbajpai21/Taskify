import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Account created successfully 🚀");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      
      {/* Neon Smoke Background */}
      <div className="absolute w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full top-[-120px] right-[-120px] animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full bottom-[-120px] left-[-120px] animate-pulse"></div>

      {/* Register Card */}
      <form
        onSubmit={handleRegister}
        className="relative z-10 w-[90%] max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8
        shadow-[0_0_40px_rgba(34,197,94,0.4)] animate-fadeIn"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Join Taskify & stay productive
        </p>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full bg-black/40 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 mb-4
          focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full bg-black/40 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 mb-4
          focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full bg-black/40 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 mb-5
          focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg font-semibold tracking-wide
          hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(34,197,94,0.8)]
          transition-all duration-300"
        >
          Register
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-300 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-green-400 hover:text-green-300 font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
