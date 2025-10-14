import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import Welcome from "./pages/WelcomePage";
import Play from "./pages/PlayPage";
import Result from "./pages/ResultPage";
import Profile from "./pages/ProfilePage";
import Feedback from "./pages/FeedbackPage";
import Admin from "./pages/AdminPage";
import OauthCallback from "./pages/OauthCallback";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminFeedback from "./pages/AdminFeedback";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/oauth-callback" element={<OauthCallback />} />

      <Route
        path="/welcome"
        element={
          <ProtectedRoute role="USER">
            <Welcome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/play"
        element={
          <ProtectedRoute role="USER">
            <Play />
          </ProtectedRoute>
        }
      />
      <Route
        path="/result"
        element={
          <ProtectedRoute role="USER">
            <Result />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute role="USER">
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feedback"
        element={
          <ProtectedRoute role="USER">
            <Feedback />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/feedbacks"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminFeedback />
          </ProtectedRoute>
        }
      />

      <Route path="/unauthorized" element={<h1> Access Denied</h1>} />
    </Routes>
  );
}

export default App;
