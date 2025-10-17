import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import api from "../api/axios";

export default function Profile() {
  const [user, setUser] = useState({ email: "", name: "", profile_url: "" });
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [favFile, setFavFile] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    // load current user profile
    api
      .get("/profile")
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to fetch profile", err));
  }, []);

  const loadFiles = () => {
    // fetch user's uploaded files list
    api
      .get("/myfav/lists")
      .then((res) => setFileList(res.data))
      .catch((err) => console.error("Failed to load files", err));
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleFileChange = (e) => {
    // preview avatar and keep selected file for submit
    const selected = e.target.files[0];
    if (selected) {
      setPreview(URL.createObjectURL(selected));
      setFile(selected);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // submit profile updates (name/email + optional avatar)
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    if (file) formData.append("profile_url", file);

    try {
      const res = await api.post("/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Profile updated!");
      setUser(res.data);
      setPreview(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleFavUpload = async (e) => {
    e.preventDefault();
    // upload a .txt file to favorites
    if (!favFile) return alert("Select a .txt file first");
    const formData = new FormData();
    formData.append("file", favFile);
    try {
      await api.post("/myfav/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded securely!");
      setFavFile(null);
      loadFiles();
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed");
    }
  };

  const handleDownload = async (id, name) => {
    // download file as blob
    try {
      const res = await api.get(`/myfav/${id}`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
      alert("Download failed");
    }
  };

  const handleLogout = () => {
    // clear token and return to homepage
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-[900px] flex flex-col py-20">
        <NavBar />

        <form
          className="flex flex-col items-center gap-9 mt-12"
          onSubmit={handleUpdate}
        >
          {/* avatar picker + preview */}
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
              <img
                src={preview || user.profile_url}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            </label>
          </div>

          {/* name */}
          <div className="flex flex-col w-[600px]">
            <label className="font-bold mb-2 text-gray-700">Name</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full border rounded-full py-3 text-center placeholder:text-sm placeholder:text-[#BDBDBD]"
            />
          </div>

          {/* email (read-only) */}
          <div className="flex flex-col w-[600px]">
            <label className="font-bold mb-2 text-gray-700">Email</label>
            <input
              type="email"
              disabled
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full border rounded-full py-3 text-center placeholder:text-sm placeholder:text-[#BDBDBD] bg-gray-200 border-gray-50"
            />
          </div>

          {/* actions */}
          <div className="flex flex-col w-[600px] mt-6">
            <button
              type="submit"
              className="w-full bg-[#F8E090] border rounded-full py-3 text-center font-normal cursor-pointer hover:brightness-95 transition"
            >
              Save Changes
            </button>
          </div>

          <div className="flex flex-col w-[600px] mt-2">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full border rounded-full py-3 text-center font-normal cursor-pointer hover:bg-gray-100 transition"
            >
              Log Out
            </button>
          </div>
        </form>

        {/* secure text file upload + list */}
        <div className="mt-20 flex flex-col items-center gap-4">
          <h2 className="font-bold text-xl text-gray-800">
            Secure File Upload
          </h2>
          <form onSubmit={handleFavUpload} className="flex gap-3 items-center">
            <input
              type="file"
              accept=".txt"
              onChange={(e) => setFavFile(e.target.files[0])}
              className="border rounded p-2"
            />
            <button
              type="submit"
              className="bg-[#F8E090] px-4 py-2 rounded hover:brightness-95 transition"
            >
              Upload
            </button>
          </form>

          <div className="mt-6 w-[600px]">
            <h3 className="font-semibold text-gray-700 mb-2">Your Files</h3>
            <ul className="border rounded-lg divide-y">
              {fileList.length === 0 && (
                <li className="text-center text-gray-500 py-3">
                  No files uploaded yet.
                </li>
              )}
              {fileList.map((f) => (
                <li
                  key={f.id}
                  className="flex justify-between items-center px-4 py-2"
                >
                  <span>{f.original_name}</span>
                  <button
                    onClick={() => handleDownload(f.id, f.original_name)}
                    className="text-blue-500 hover:underline"
                  >
                    Download
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
