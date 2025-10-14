import { useEffect, useState } from "react";
import api from "../api/axios";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    api.get("/profile")
      .then((res) => {
        if (res.data) setUser(res.data.data);
      })
      .catch((err) => {
        console.warn("Auth check failed:", err);
        localStorage.removeItem("token"); 
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
