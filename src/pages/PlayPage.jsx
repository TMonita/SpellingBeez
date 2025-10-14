import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sound from "../assets/Sound.png";
import NavBar from "../components/Navbar";
import api from "../api/axios";

export default function Play() {
  const navigate = useNavigate();
  const [currentGame, setCurrentGame] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCurrentGame();
  }, []);

  const fetchCurrentGame = async () => {
    try {
      setLoading(true);
      const response = await api.get("/game/current", {
        method: "GET",
      });

      const result = await response.data;

      if (result.success) {
        if (result.data) {
          setCurrentGame(result.data);
        } else {
          setError("No active game found. Please start a new game.");
        }
      } else {
        setError(result.message || "Failed to fetch game");
      }
    } catch (error) {
      setError("Error connecting to server");
      console.error("Error fetching current game:", error);
    } finally {
      setLoading(false);
    }
  };

  const playAudio = () => {
    if (currentGame?.currentQuestion?.audioUrl) {
      const audio = new Audio(currentGame.currentQuestion.audioUrl);
      audio.play().catch((e) => {
        console.error("Audio play failed:", e);
        alert("Could not play audio. Please try again.");
      });
    }
  };

  const handleSubmit = async () => {
    if (!userAnswer.trim()) {
      alert("Please enter your answer!");
      return;
    }

    try {
      const response = await api.post("/game/check-answer", {
        userAnswer: userAnswer,
        questionWord: currentGame.currentQuestion.word,
      });

      const result = await response.data;
      console.log('complete', result.data.correct)
      if (result.success) {
        if (result.data.gameCompleted) {
          navigate("/result", {
            state: {
              finalScore: result.data.currentScore,
              correct: result.data.correct,
              correctAnswer: result.data.correctAnswer,
            },
          });
        } else {
          setUserAnswer("");
          fetchCurrentGame();

          if (result.data.correct) {
            alert(`✅ Correct! +${result.data.scoreEarned} points`);
          } else {
            alert(`❌ Incorrect! The word was: ${result.data.correctAnswer}`);
          }
        }
      } else {
        setError(result.message || "Failed to check answer");
      }
    } catch (error) {
      setError("Error checking answer");
      console.error("Error checking answer:", error);
    }
  };

  const startNewGame = async () => {
    try {
      setLoading(true);
      const response = await api.post(
        "/game/start",
      );

      const result = await response.data;

      if (result.success) {
        setCurrentGame({
          currentQuestion: result.data,
          currentLevel: 1,
          currentScore: 0,
        });
        setError("");
      } else {
        setError(result.message || "Failed to start game");
      }
    } catch (error) {
      setError("Error starting game");
      console.error("Error starting game:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading game...</div>
      </div>
    );
  }

  if (error && !currentGame) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-[900px] flex flex-col py-20">
          <NavBar />
          <div className="flex flex-col items-center gap-6">
            <div className="text-red-500 text-lg">{error}</div>
            <button
              onClick={startNewGame}
              className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              Start New Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentGame) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-[900px] flex flex-col py-20">
          <NavBar />
          <div className="flex flex-col items-center gap-6">
            <div className="text-lg">No active game found</div>
            <button
              onClick={startNewGame}
              className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600"
            >
              Start New Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[900px] flex flex-col py-20">
        <NavBar />

        {/* Game Stats */}
        <div className="flex justify-between items-center mb-8 px-4">
          <div className="text-lg font-bold">
            Level: {currentGame.currentLevel}
          </div>
          <div className="text-lg font-bold">
            Score: {currentGame.currentScore}
          </div>
        </div>

        {/* Sound Button */}
        <div className="flex justify-center items-center py-5">
          <button
            onClick={playAudio}
            className="p-4 rounded-full hover:bg-gray-100 transition-colors"
          >
            <img src={Sound} alt="Sound" className="w-12 h-12 object-contain" />
          </button>
        </div>

        {/* Question Content */}
        <div className="flex justify-center items-center">
          <div className="w-[600px] mt-3 flex flex-col gap-6">
            <div>
              <p className="font-bold text-lg">Definition:</p>
              <p className="text-base leading-relaxed text-justify mt-2">
                {currentGame.currentQuestion?.definition ||
                  "Loading definition..."}
              </p>
            </div>

            {currentGame.currentQuestion?.example && (
              <div>
                <p className="font-bold text-lg">Example:</p>
                <p className="text-base leading-relaxed text-justify mt-2 italic">
                  "{currentGame.currentQuestion.example}"
                </p>
              </div>
            )}

            {currentGame.currentQuestion?.pronunciation && (
              <div>
                <p className="font-bold text-lg">Pronunciation:</p>
                <p className="text-base leading-relaxed mt-2">
                  {currentGame.currentQuestion.pronunciation}
                </p>
              </div>
            )}

            {/* Answer Input */}
            <div className="flex flex-col gap-4 mt-4">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type the word you heard"
                className="w-full border-2 border-gray-300 rounded-full py-3 px-6 text-center placeholder:text-sm placeholder:text-[#BDBDBD] focus:outline-none focus:border-yellow-400"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />

              <button
                onClick={handleSubmit}
                className="w-full border rounded-full py-3 text-center text-sm focus:outline-none transition-colors hover:bg-yellow-500"
                style={{ backgroundColor: "#F8E090" }}
                disabled={!userAnswer.trim()}
              >
                Submit Answer
              </button>
            </div>

            {error && (
              <div className="text-red-500 text-center mt-4">{error}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
