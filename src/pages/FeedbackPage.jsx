import React, { useState } from "react";
import NavBar from "../components/Navbar";
import api from "../api/axios";

export default function Feedback() {
  const [messages, setMessages] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // prevent empty submission
    if (!messages.trim()) {
      alert("⚠️ Feedback cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/feedback", { messages });
      alert("Thanks for your feedback!");
      setMessages("");
    } catch (err) {
      console.error("Feedback failed:", err);
      alert("Failed to send feedback. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex pt-24 flex-col justify-center items-center w-full">
      <NavBar />

      <div className="w-[900px] flex justify-center items-center">
        <div className="flex flex-col justify-end mt-20 px-4 w-[600px]">
          {/* feedback input */}
          <textarea
            value={messages}
            onChange={(e) => setMessages(e.target.value)}
            placeholder="Input your feedback here"
            className="w-full max-w-2xl h-40 border border-gray-300 rounded-lg p-4 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />

          {/* submit button with loading state */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full mt-3 border rounded-full py-3 text-center font-semibold cursor-pointer transition ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#F8E090] hover:brightness-95"
            }`}
          >
            {loading ? "Sending..." : "SUBMIT"}
          </button>

          <h2 className="mt-8 text-6xl font-light text-end">
            SEND US <br /> <p className="mt-9">YOUR FEEDBACK</p>
          </h2>
        </div>
      </div>
    </div>
  );
}
