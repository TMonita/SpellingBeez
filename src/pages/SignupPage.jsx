import React from "react";
import AuthForm from "../components/AuthForm";

function Signup() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex items-center justify-center bg-white">
        < AuthForm mode = "signup"/>
      </div>
      <div className="hidden md:flex flex-1 bg-white items-center justify-center">
        <h1 className="text-6xl font-light leading-snug">
          <div className="text-right"> 
            <h1 className="text-8xl font-light leading-snug">
              LISTEN<br />AND<br />ANSWER
              <p className=" text-4xl mt-4 font-light" style={{ color: "#F8E090" }}>Spelling BeeZ</p>
            </h1>
          </div>  
        </h1>
      </div>
    </div>
    
  );
}

export default Signup;

