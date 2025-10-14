import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from "../components/Navbar";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { finalScore, correct, correctAnswer } = location.state || {};

  const handlePlayAgain = () => {
    navigate("/play");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[900px] flex flex-col py-20">
        <NavBar />
        
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-3xl font-bold">Game Completed!</h1>
          
          <div className="text-2xl">
            Final Score: <span className="font-bold">{finalScore || 0}</span>
          </div>

          {correctAnswer && (
            <div className="text-lg">
              Last word: <span className="font-bold">{correctAnswer}</span>
            </div>
          )}

          <button
            onClick={handlePlayAgain}
            className="px-8 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 text-lg"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}