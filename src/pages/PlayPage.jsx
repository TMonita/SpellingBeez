import { useState } from "react";

export default function PlayPage() {
  const [hint, setHint] = useState("A large mammal known for its trunk");
  const [answer, setAnswer] = useState("");

  const handlePlay = () => {
    // Call API to play pronunciation audio
  };

  const handleSubmit = () => {
    // Validate answer via API
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-6 bg-yellow-50">
      <h1 className="text-4xl font-light mb-2">Spelling BeeZ 🐝</h1>

      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
        <button
          onClick={handlePlay}
          className="text-lg font-semibold mb-4 px-4 py-2 bg-yellow-400 rounded-full hover:bg-yellow-300"
        >
          🔊 Listen
        </button>

        <p className="text-gray-500 italic mb-4">{hint}</p>

        <input
          type="text"
          placeholder="Type what you heard..."
          className="w-full px-4 py-3 border rounded-xl focus:outline-none"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="mt-4 w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
