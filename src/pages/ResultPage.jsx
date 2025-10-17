import React from "react";
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/Navbar";

export default function Result() {
  const navigate = useNavigate();

  // go to next word
  const handleSubmit = () => {
    navigate("/play");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[900px] flex flex-col py-20">
        <NavBar />

        {/* result content */}
        <div className="flex flex-col gap-9 mt-12">
          <div className="flex justify-center items-center">
            <p className="font-bold">THAT’S CORRECT</p>
          </div>

          <div className="flex justify-center items-center">
            <p className="text-9xl font-light text-yellow-500 [text-stroke:2px_black]">
              BEE
            </p>
          </div>

          <div className="flex flex-col justify-center items-center">
            <p className="font-bold">Your Answer</p>
            <p className="font-normal text-3xl">BEE</p>
          </div>

          {/* actions */}
          <div className="flex justify-center items-center">
            <div className="w-[600px] mt-3 flex flex-col gap-9">
              <div className="flex gap-3">
                <button
                  type="button"
                  className="w-full bg-white border rounded-full py-3 text-center placeholder:text-sm placeholder:text-[#BDBDBD]"
                >
                  Go Back
                </button>

                <input
                  type="submit"
                  onClick={handleSubmit}
                  value={"Next Word"}
                  className="w-full bg-[#F8E090] border rounded-full py-3 text-center placeholder:text-sm placeholder:text-[#BDBDBD]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
