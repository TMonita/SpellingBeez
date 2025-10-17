import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import api from "../api/axios";
import useAuth from "../hooks/useAuth";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1 });
  const { user } = useAuth();

  useEffect(() => {
    // initial load
    fetchUsers(1);
  }, []);

  // fetch paginated users for the admin table
  const fetchUsers = async (page = 1) => {
    try {
      const res = await api.get(`/admin/users?page=${page}`);
      setUsers(res.data.data);
      setMeta({
        current_page: res.data.current_page,
        last_page: res.data.last_page,
      });
    } catch (err) {
      console.error("❌ Failed to fetch users", err);
    }
  };

  // small stat card used in the top grid
  const StatCard = ({ value, label, variant }) => {
    const colors = {
      purple: "bg-[#7C7CF2]",
      blue: "bg-[#8DC5F8]",
      orange: "bg-[#F8C47A]",
      red: "bg-[#F49B8E]",
    };
    return (
      <div className="rounded-2xl border border-[#eee] p-5 w-full shadow-sm">
        <div className="text-3xl font-bold">{value}</div>
        <div className="mt-1 text-sm text-[#7C7C7C] font-semibold">{label}</div>
        <div className="mt-1 text-xs text-[#BDBDBD]">+15%</div>
        <div className="flex items-end gap-1 mt-2">
          {[10, 16, 8, 18, 12].map((h, i) => (
            <div
              key={i}
              className={`${colors[variant]} w-2 rounded-sm`}
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-start">
      <div className="w-[900px] flex flex-col py-5">
        <NavBar />

        {/* greeting */}
        <div className="mt-10 text-center">
          <p className="text-xl tracking-widest">HELLO</p>
          <p className="text-3xl font-semibold mt-1">{user?.name || "-"}</p>
        </div>

        {/* quick stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard value={users.length} label="ALL USERS" variant="purple" />
          <StatCard value={5} label="NEW USERS" variant="orange" />
          <StatCard value={10} label="Right Words" variant="blue" />
          <StatCard value={4} label="Wrong Words" variant="red" />
        </div>

        {/* latest users table */}
        <div className="mt-12">
          <p className="text-sm font-semibold tracking-wide mb-3">LATEST USERS</p>

          <div className="overflow-hidden rounded-2xl border border-[#eee] shadow-sm">
            {/* header */}
            <div className="bg-[#F8E090] px-6 py-4 text-sm font-semibold">
              <div className="grid grid-cols-12">
                <div className="col-span-2">User ID</div>
                <div className="col-span-3">Name</div>
                <div className="col-span-4">Email</div>
                <div className="col-span-3 text-center">Role</div>
              </div>
            </div>

            {/* rows */}
            <ul className="divide-y divide-[#f2f2f2]">
              {users.map((u) => (
                <li key={u.id} className="px-6 py-5 hover:bg-[#fafafa]">
                  <div className="grid grid-cols-12 items-center text-sm">
                    <div className="col-span-2">#{u.id}</div>
                    <div className="col-span-3">{u.name}</div>
                    <div className="col-span-4">{u.email}</div>
                    <div className="col-span-3 text-center capitalize">
                      {u.role || "user"}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* pagination */}
            <div className="flex justify-end items-center gap-3 px-6 py-4">
              <button
                disabled={meta.current_page === 1}
                onClick={() => fetchUsers(meta.current_page - 1)}
                className="h-9 w-9 grid place-items-center rounded-full border border-[#eee]"
              >
                ‹
              </button>
              <span className="text-sm font-medium">
                {meta.current_page} / {meta.last_page}
              </span>
              <button
                disabled={meta.current_page === meta.last_page}
                onClick={() => fetchUsers(meta.current_page + 1)}
                className="h-9 w-9 grid place-items-center rounded-full border border-[#eee]"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
