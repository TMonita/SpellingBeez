import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import api from "../api/axios";

export default function Profile() {
  const [user, setUser] = useState({ 
    userName: "", 
    emailAddress: "", 
    role: "",
    createdAt: "",
    id: ""
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get("/profile");
      setUser(response.data.data); 
      setMessage("");
    } catch (err) {
      console.error("Failed to fetch profile", err);
      setMessage("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch("/profile", {
        emailAddress: user.emailAddress,
        userName: user.userName,
      });
      
      if (response.data.success) {
        setMessage("Profile updated successfully!");
        setUser(response.data.data);
      } else {
        setMessage(response.data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Failed to update profile", err);
      setMessage("Failed to update profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="w-[900px] flex flex-col py-20">
          <NavBar />
          <div className="flex justify-center items-center mt-12">
            <div className="text-xl">Loading profile...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-[900px] flex flex-col py-20">
        <NavBar />

        {/* Success/Error Message */}
        {message && (
          <div className={`mx-auto w-[600px] mb-6 p-3 rounded text-center ${
            message.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {message}
          </div>
        )}

        <form
          className="flex flex-col items-center gap-9 mt-12"
          onSubmit={handleUpdate}
        >
          {/* Profile Picture - Optional */}
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full border-2 bg-[#F8E090] flex items-center justify-center text-gray-500 text-sm font-semibold overflow-hidden">
              <div className="text-2xl">
                {user.userName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            </div>
          </div>

          {/* Username Field */}
          <div className="flex flex-col w-[600px]">
            <label className="font-bold mb-2 text-gray-700">Username</label>
            <input
              type="text"
              value={user.userName || ""}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              className="w-full border rounded-full py-3 px-6 text-center placeholder:text-sm placeholder:text-[#BDBDBD] focus:outline-none focus:border-yellow-400"
              placeholder="Enter your username"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col w-[600px]">
            <label className="font-bold mb-2 text-gray-700">Email</label>
            <input
              type="email"
              disabled
              value={user.emailAddress || ""}
              className="w-full border rounded-full  bg-gray-100 text-gray-600 py-3 px-6 text-center placeholder:text-sm placeholder:text-[#BDBDBD] focus:outline-none focus:border-yellow-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Role Field*/}
          <div className="flex flex-col w-[600px]">
            <label className="font-bold mb-2 text-gray-700">Role</label>
            <input
              type="text"
              value={user.role || ""}
              disabled
              className="w-full border rounded-full py-3 px-6 text-center bg-gray-100 text-gray-600"
            />
          </div>

          {/* Member Since Field */}
          {user.createdAt && (
            <div className="flex flex-col w-[600px]">
              <label className="font-bold mb-2 text-gray-700">Member Since</label>
              <input
                type="text"
                value={new Date(user.createdAt).toLocaleDateString()}
                disabled
                className="w-full border rounded-full py-3 px-6 text-center bg-gray-100 text-gray-600"
              />
            </div>
          )}

          {/* Save Changes Button */}
          <div className="flex flex-col w-[600px] mt-6">
            <button
              type="submit"
              className="w-full bg-[#F8E090] border rounded-full py-3 text-center font-normal cursor-pointer hover:brightness-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!user.userName || !user.emailAddress}
            >
              Save Changes
            </button>
          </div>

          {/* Log Out Button */}
          <div className="flex flex-col w-[600px] mt-2">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full border border-gray-300 rounded-full py-3 text-center font-normal cursor-pointer hover:bg-gray-100 transition"
            >
              Log Out
            </button>
          </div>
        </form>

        {/* Game Statistics Section */}
        <div className="mt-20 flex flex-col items-center gap-6">
          <h2 className="font-bold text-2xl text-gray-800">
            Game Statistics
          </h2>
          
          <div className="grid grid-cols-2 gap-6 w-[600px]">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600">0</div>
              <div className="text-gray-600 mt-2">Games Played</div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600">0</div>
              <div className="text-gray-600 mt-2">Total Score</div>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-600">0</div>
              <div className="text-gray-600 mt-2">Correct Answers</div>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-orange-600">0%</div>
              <div className="text-gray-600 mt-2">Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}