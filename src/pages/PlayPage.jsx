import React from "react";
import { useNavigate } from "react-router-dom";
import Sound from "../assets/Sound.png";
import NavBar from "../components/Navbar";

export default function Play() {
  const navigate = useNavigate();

  // move to result page after submit
  const handleSubmit = () => {
    navigate("/result");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[900px] flex flex-col py-20">
        <NavBar />

        {/* sound icon */}
        <div className="flex justify-center items-center py-5">
          <img src={Sound} alt="Sound" className="w-15 h-15 object-contain" />
        </div>

        {/* word details and answer input */}
        <div className="flex justify-center items-center">
          <div className="w-[600px] mt-3 flex flex-col gap-9">
            <p className="font-bold">Part of Speech:</p>
            <p>Noun</p>
            <p className="font-bold">Definition:</p>
            <p className="text text-base leading-relaxed text-justify">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamcocia
              deserunt mollit anim id est laborum."
            </p>

            {/* answer input and submit */}
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Input your answer here"
                className="w-full border rounded-full py-3 text-center placeholder:text-sm placeholder:text-[#BDBDBD] focus:outline-none"
              />

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full border rounded-full py-3 text-center placeholder:text-sm placeholder:text-[#BDBDBD] focus:outline-none"
                style={{ backgroundColor: "#F8E090" }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
