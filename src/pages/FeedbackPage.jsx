import React from "react";
import NavBar from "../components/Navbar";

export default function Feedback() {
  const handleSubmit = () => {
    alert("Thanks for your feedback"); 
  };

  return (
    <div className="flex pt-24 flex-col justify-center items-center w-full">
      <NavBar />

      <div className="w-[900px] flex justify-center items-center">
        <div className="flex flex-col justify-end mt-20 px-4 w-[600px]">
          <textarea
            placeholder="Input your feedback here"
            className="w-full max-w-2xl h-40 border border-gray-300 rounded-lg p-4 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />

          <button
            onClick={handleSubmit} 
            className="w-full mt-3 bg-[#F8E090] border rounded-full py-3 text-center font-semibold cursor-pointer hover:brightness-95 transition"
          >
            SUBMIT
          </button>

          <h2 className="mt-8 text-6xl font-light text-end">
            SEND US <br /> <p className="mt-9">YOUR FEEDBACK</p>
          </h2>
        </div>
      </div>
    </div>
  );
}
