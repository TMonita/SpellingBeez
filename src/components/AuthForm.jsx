import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import logo from "../assets/SpellingBeezLogo.png";

export default function AuthForm({ mode }) {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint =
      mode === "signup"
        ? "http://127.0.0.1:8080/api/v1/auth/register"
        : "http://127.0.0.1:8080/api/v1/auth/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body:
          mode === "signup"
            ? JSON.stringify({
                userName: userName,
                emailAddress: email,
                password: password,
              })
            : JSON.stringify({ emailAddress: email, password: password }),
      });

      console.log("Response status:", response.status);

      const text = await response.text();
      console.log("Raw response:", text);

      if (!response.ok) {
        throw new Error(
          `${mode === "signup" ? "Signup" : "Login"} failed (${
            response.status
          }): ${text}`
        );
      }

      if (mode === "signup") {
        navigate("/login");
        alert("Registration success, Please login to continue!");
      }
      const data = JSON.parse(text);
      localStorage.setItem("token", data.data.accessToken);
        navigate("/welcome");

    } catch (err) {
      console.error("Error in auth:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-sm px-6 py-8 shadow-lg rounded-2xl border border-white">
      <div className="flex justify-center mb-6">
        <img
          src={logo}
          alt="SpellingBeezLogo"
          className="w-24 h-24 object-contain"
        />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none"
          />
          <div
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white transition 
          ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >
          {mode === "signup" ? "Sign Up" : "Log In"}
        </button>
      </form>

      {mode === "signup" ? (
        <div className="mt-4 text-center text-sm text-gray-600 space-y-2">
          <p className="text-xs text-gray-500 leading-relaxed px-2">
            By signing up, you agree to our{" "}
            <a
              href="/privacy-policy"
              className="text-black underline hover:text-gray-800"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="/terms-of-service"
              className="text-black underline hover:text-gray-800"
            >
              Terms of Service
            </a>
            .
          </p>

          <p>
            Already a member?{" "}
            <a href="/login" className="text-black font-medium">
              Log In
            </a>
          </p>
        </div>
      ) : (
        <p className="text-center mt-4 text-sm text-gray-600">
          Are you a Newbie?{" "}
          <a href="/" className="text-black font-medium">
            GET STARTED - IT'S FREE
          </a>
        </p>
      )}
    </div>
  );
}
