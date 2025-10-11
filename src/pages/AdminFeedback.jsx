import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

export default function AdminFeedback() {
  const { user } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get("/admin/feedbacks");
        setFeedbacks(res.data.feedback || res.data);
        console.log(res.data)
      } catch (err) {
        console.error("Failed to fetch feedbacks:", err);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div className="flex justify-center items-start">
      <div className="w-[900px] flex flex-col py-5">
        <NavBar />

        <div className="mt-10 text-center">
          <p className="text-xl tracking-widest">HELLO</p>
          <p className="text-3xl font-semibold mt-1">
            {user?.name || "ADMIN"}
          </p>
        </div>

        <div className="mt-12">
          <p className="text-sm font-semibold tracking-wide mb-3">
            USER FEEDBACKS
          </p>

          <div className="overflow-hidden rounded-2xl border border-[#eee] shadow-sm">
            <div className="bg-[#F8E090] px-6 py-4 text-sm font-semibold">
              <div className="grid grid-cols-12">
                <div className="col-span-2">User ID</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-5">Message</div>
                <div className="col-span-2">Date</div>
              </div>
            </div>

            <ul className="divide-y divide-[#f2f2f2]">
              {feedbacks.map((f, idx) => (
                <li key={idx} className="px-6 py-5 hover:bg-[#fafafa]">
                  <div className="grid grid-cols-12 items-center text-sm">
                    <div className="col-span-2">{f.user_id}</div>
                    <div className="col-span-3">{f.user.email}</div>
                    <div className="col-span-5 truncate">{f.messages}</div>
                    <div className="col-span-2">
                      {new Date(f.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
