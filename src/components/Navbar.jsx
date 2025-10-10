import React, { useState, useRef, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; // ✅ Import navigate
import SpellingBeezLogo from "../assets/SpellingBeezLogo.png";
import Ellipse from "../assets/Ellipse.png";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // ✅ Initialize navigate

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handlers for menu items
  const handleProfile = () => {
    navigate("/profile");
    setOpen(false);
  };

  const handleFeedback = () => {
    navigate("/feedback");
    setOpen(false);
  };

  const handleLogout = () => {
    // Implement your logout logic here, e.g., clearing auth tokens
    console.log("Logged out");
    navigate("/login"); // redirect to login page
    setOpen(false);
  };

  return (
    <div className="flex justify-center items-center w-full bg-white">
      <div className="w-[900px] flex justify-between items-center">
        {/* Left Logo */}
        <img src={SpellingBeezLogo} className="w-24 h-16" alt="Logo" />

        {/* Right Profile Image with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <img
            src={Ellipse}
            alt="Profile"
            className="w-16 h-16 rounded-full border cursor-pointer object-cover"
            onClick={() => setOpen(!open)}
          />

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute justify-center text-black items-center -right-20 mt-3 w-56 bg-white rounded-xl shadow-lg border overflow-hidden animate-fadeIn z-50">
              <ul className="flex flex-col text-gray-700 justify-center items-center px-2">
                <li
                  className="w-full text-center py-3 hover:bg-gray-100 cursor-pointer border-b pb-2"
                  onClick={handleProfile}
                >
                  Profile
                </li>
                <li
                  className="w-full text-center py-3 hover:bg-gray-100 cursor-pointer border-b pb-2"
                  onClick={handleFeedback}
                >
                  Send us Feedback
                </li>
                <li
                  className="w-full text-center py-3 hover:bg-gray-100 cursor-pointer border-b pb-2"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
