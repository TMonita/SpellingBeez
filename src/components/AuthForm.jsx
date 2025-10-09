import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function AuthForm({ mode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend API
    navigate("/play");
  };

  return (
    <div className="w-full max-w-sm px-6 py-8 shadow-lg rounded-2xl border border-gray-100">
      <div className="flex justify-center mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
          <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      <button className="w-full py-3 bg-yellow-400 text-black rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-yellow-300">
        <FcGoogle size={20} />
        <span>Sign up with Google</span>
      </button>

      <div className="flex items-center my-6">
        <hr className="flex-1 border-gray-200" />
        <span className="px-2 text-gray-400 text-sm">or use Email</span>
        <hr className="flex-1 border-gray-200" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800"
        >
          {mode === "signup" ? "Sign Up" : "Log In"}
        </button>
      </form>

      {mode === "signup" ? (
        <p className="text-center mt-4 text-sm text-gray-600">
          Already a member?{" "}
          <a href="/login" className="text-black font-medium">
            Log In
          </a>
        </p>
      ) : (
        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/" className="text-black font-medium">
            Sign Up
          </a>
        </p>
      )}
    </div>
  );
}
