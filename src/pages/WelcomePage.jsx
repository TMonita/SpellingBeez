import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { ellipse } from 'framer-motion/client';
import SpellingBeezLogo from "../assets/SpellingBeezLogo.png";
import Ellipse from "../assets/Ellipse.png";


function Welcome() {
    const navigate = useNavigate();
    const handleStart = ()=> {
        navigate("/play");
    };

    return (
   
        
     <div onClick={handleStart} className=" flex flex-col items-center justify-center py-20 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-[900px] text-center"
      >
         
          <div className="flex items-center justify-between">
            <Navbar />
        
        </div>

        <h1 className="text-8xl pr-24 font-normal mt-10 tracking-wider leading-snug text-right">
          LET’S
          <br />
          GET
          <br />
          STARTED
        </h1>
      </motion.div>
    </div>
  
    );
}
export default Welcome;