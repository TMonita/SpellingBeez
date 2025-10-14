import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import api from "../api/axios";
import NavBar from "../components/Navbar"; 

function Welcome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStart = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/game/start", {}, { withCredentials: true });
      console.log("Game started:", res.data);

      navigate("/play");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-[900px] text-center"
      >
        <div className="flex items-center justify-between">
          <NavBar />
        </div>

        <h1 className="text-8xl pr-24 font-normal mt-10 tracking-wider leading-snug text-right">
          LET’S
          <br />
          GET
          <br />
          STARTED
        </h1>

        <div className="mt-12 pr-24 flex justify-end space-x-6">
          <button
            onClick={handleStart}
            disabled={loading}
            className={`px-8 py-4 text-lg rounded-xl font-semibold transition 
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"}`}
          >
            {loading ? "Starting..." : "Start Game"}
          </button>
           {error && (
          <a className="text-right pr-24 mt-4 text-sm" href="/play">Go current game!</a>
        )}
        </div>


        {error && (
          <p className="text-red-500 text-right pr-24 mt-4 text-sm">{error}</p>
        )}
      </motion.div>
    </div>
  );
}

export default Welcome;
