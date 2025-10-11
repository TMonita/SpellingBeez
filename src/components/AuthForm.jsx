import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import eye icons
import logo from "../assets/SpellingBeezLogo.png";

export default function AuthForm({ mode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // toggle state
  const navigate = useNavigate();

  const handleOauthLogin = () => {
    const popup = window.open(
      "http://localhost:8000/auth/google",
      "googleLogin",
      "width=600,height=700"
    );

    if (!popup) {
      alert("Popup blocked — allow popups for this site.");
      return;
    }

    const allowedOrigins = ["http://localhost:8000", "http://127.0.0.1:8000"];

    const messageListener = (event) => {
      console.log("📨 Message received from:", event.origin, event.data);

      if (event.origin !== "http://localhost:5173") return;

      const { token } = event.data || {};
      if (token) {
        console.log("Token received:", token);
        localStorage.setItem("token", token);

        navigate("/welcome");
      }
    };

    window.addEventListener("message", messageListener);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      mode === "signup"
        ? "http://127.0.0.1:8000/api/register"
        : "http://127.0.0.1:8000/api/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
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

      const data = JSON.parse(text);
      console.log("Parsed data:", data);

      localStorage.setItem("token", data.token);
      navigate("/welcome");
    } catch (err) {
      console.error("Error in auth:", err);
      alert(err.message);
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

      <button
        onClick={handleOauthLogin}
        className="w-full py-3 text-black rounded-xl font-light flex items-center justify-center"
        style={{
          backgroundColor: "#F8E090",
          borderRadius: "50px",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#f6d770")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#F8E090")
        }
      >
        <FcGoogle size={20} />
        <span>
          {mode === "signup" ? "Sign up with Google" : "Log in with Google"}
        </span>
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
          className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800"
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
