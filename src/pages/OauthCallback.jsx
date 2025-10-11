import { useEffect } from "react";

export default function OauthCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (window.opener && token) {
      window.opener.postMessage({ token }, "http://localhost:5173");
      window.close();
    } else {
      console.log("⚠️ No opener or token found");
      document.body.innerHTML = "<h2>Authentication complete. You can close this window.</h2>";
    }
  }, []);

  return <div>Finishing login...</div>;
}
