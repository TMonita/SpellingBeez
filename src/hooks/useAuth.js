import { useEffect, useState } from "react";
import api from "../api/axios";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If no token, skip request
    if (!token) {
      setLoading(false);
      return;
    }

    // Validate token by fetching profile
    api.get("/profile")
      .then((res) => {
        if (res.data) setUser(res.data);
      })
      .catch((err) => {
        console.warn("Auth check failed:", err);
        localStorage.removeItem("token"); // remove invalid token
      })
      .finally(() => setLoading(false));
  }, []);

  // Expose user object and loading state
  return { user, loading };
}
