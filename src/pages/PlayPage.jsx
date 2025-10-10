// import { useState } from "react";

// function Play() {
//   const [hint, setHint] = useState("A large mammal known for its trunk");
//   const [answer, setAnswer] = useState("");

//   const handlePlay = () => {
//     // Call API to play pronunciation audio
//   };

//   const handleSubmit = () => {
//     // Validate answer via API
//   };

//   return (
//     <div className="h-screen flex flex-col items-center justify-center space-y-6 bg-yellow-50">
//       <h1 className="text-4xl font-light mb-2">Spelling BeeZ 🐝</h1>

//       <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
//         <button
//           onClick={handlePlay}
//           className="text-lg font-semibold mb-4 px-4 py-2 bg-yellow-400 rounded-full hover:bg-yellow-300"
//         >
//           🔊 Listen
//         </button>

//         <p className="text-gray-500 italic mb-4">{hint}</p>

//         <input
//           type="text"
//           placeholder="Type what you heard..."
//           className="w-full px-4 py-3 border rounded-xl focus:outline-none"
//           value={answer}
//           onChange={(e) => setAnswer(e.target.value)}
//         />

//         <button
//           onClick={handleSubmit}
//           className="mt-4 w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800"
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }


// export default Play;



import React from "react";
import { useNavigate } from 'react-router-dom';
import Sound from "../assets/Sound.png";
import NavBar from "../components/Navbar";


export default function Play() {
  const navigate = useNavigate();
  const handleSubmit =()=>{
    navigate("/result");
    // console.log("Submit Clicked");

  }
  return (
    <div className="flex justify-center  items-center ">
      <div className="w-[900px] flex flex-col py-20">
        <NavBar />
        <div className="flex justify-center items-center">
           <img src={Sound} alt="Sound" className="w-15 h-15 object-contain" />
        </div>
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
        

            <div  className="flex flex-col gap-3">
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