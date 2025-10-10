import React, { useState } from "react";
import NavBar from "../components/Navbar";


export default function Profile() {
  const [preview, setPreview] = useState(null);

  // Handle image upload and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-[900px] flex flex-col py-20">
       <NavBar/>
        <div className="flex flex-col items-center gap-9 mt-12">
          <div className="flex justify-center">
            <input
              type="file"
              accept="image/*"
              id="uploadProfile"
              className="hidden"
              onChange={handleFileChange}
            />

            <label
              htmlFor="uploadProfile"
              className="w-32 h-32 rounded-full border-2 bg-[#F8E090] flex items-center justify-center text-gray-500 text-sm font-semibold hover:bg-gray-50 transition cursor-pointer overflow-hidden"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                "Upload Profile"
              )}
            </label>
          </div>

          <div className="flex flex-col w-[600px]">
            <label className="font-bold mb-2 text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-full py-3 text-center placeholder:text-sm placeholder:text-[#BDBDBD]"
            />
          </div>

          <div className="flex flex-col w-[600px]">
            <label className="font-bold mb-2 text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-full py-3 text-center placeholder:text-sm placeholder:text-[#BDBDBD]"
            />
          </div>

          <div className="flex justify-center w-[600px] mt-6">
            <input
              type="submit"
              value="Log Out"
              className="w-full bg-[#F8E090] border rounded-full py-3 text-center font-normal cursor-pointer hover:brightness-95 transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
}