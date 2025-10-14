import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import api from "../api/axios";
import useAuth from "../hooks/useAuth";

export default function Admin() {
  const [data, setData] = useState({
    users: [],
    overallStats: {}
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchUsersWithStats();
  }, []);

  const fetchUsersWithStats = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users/with-stats");
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (err) {
      console.error("❌ Failed to fetch users and stats", err);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading admin dashboard...</div>
      </div>
    );
  }

  const { users, overallStats } = data;

  return (
    <div className="flex justify-center items-start">
      <div className="w-[900px] flex flex-col py-5">
        <NavBar />

        <div className="mt-10 text-center">
          <p className="text-xl tracking-widest">HELLO</p>
          <p className="text-3xl font-semibold mt-1">{user?.username || user?.name || 'Admin'}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard value={overallStats.totalUsers || 0} label="ALL USERS" variant="purple" />
          <StatCard value={overallStats.totalGamesPlayed || 0} label="TOTAL GAMES" variant="orange" />
          <StatCard value={overallStats.totalScore || 0} label="TOTAL SCORE" variant="blue" />
          <StatCard value={overallStats.averageScore || 0} label="AVG SCORE" variant="red" />
        </div>

        <div className="mt-12">
          <p className="text-sm font-semibold tracking-wide mb-3">ALL USERS</p>

          <div className="overflow-hidden rounded-2xl border border-[#eee] shadow-sm">
            {/* Head */}
            <div className="bg-[#F8E090] px-6 py-4 text-sm font-semibold">
              <div className="grid grid-cols-12">
                <div className="col-span-1">ID</div>
                <div className="col-span-2">Username</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-1 text-center">Role</div>
                <div className="col-span-2 text-center">Games</div>
                <div className="col-span-2 text-center">Score</div>
                <div className="col-span-1 text-center">Level</div>
              </div>
            </div>

            {/* Rows */}
            <ul className="divide-y divide-[#f2f2f2]">
              {users.map((u) => (
                <li key={u.id} className="px-6 py-4 hover:bg-[#fafafa]">
                  <div className="grid grid-cols-12 items-center text-sm">
                    <div className="col-span-1 font-medium">#{u.id}</div>
                    <div className="col-span-2">{u.userName}</div>
                    <div className="col-span-3 truncate">{u.emailAddress}</div>
                    <div className="col-span-1 text-center">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        u.role === 'ADMIN' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {u.role?.toLowerCase() || "user"}
                      </span>
                    </div>
                    <div className="col-span-2 text-center font-medium">{u.totalGamesPlayed}</div>
                    <div className="col-span-2 text-center font-medium text-green-600">{u.totalScore}</div>
                    <div className="col-span-1 text-center font-medium">{u.currentLevel}</div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer Stats */}
            <div className="bg-gray-50 px-6 py-3 border-t">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <div>
                  Showing <span className="font-medium">{users.length}</span> users
                </div>
                <div className="flex gap-4">
                  <div>Total Games: <span className="font-medium">{overallStats.totalGamesPlayed}</span></div>
                  <div>Total Score: <span className="font-medium">{overallStats.totalScore}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={fetchUsersWithStats}
            className="px-6 py-2 bg-[#F8E090] rounded-full hover:brightness-95 transition font-medium"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}