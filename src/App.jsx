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
      {/* public routes */}
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/oauth-callback" element={<OauthCallback />} />

      {/* user-only routes */}
      <Route
        path="/welcome"
        element={
          <ProtectedRoute role="user">
            <Welcome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/play"
        element={
          <ProtectedRoute role="user">
            <Play />
          </ProtectedRoute>
        }
      />
      <Route
        path="/result"
        element={
          <ProtectedRoute role="user">
            <Result />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute role="user">
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feedback"
        element={
          <ProtectedRoute role="user">
            <Feedback />
          </ProtectedRoute>
        }
      />

      {/* admin-only routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/feedbacks"
        element={
          <ProtectedRoute role="admin">
            <AdminFeedback />
          </ProtectedRoute>
        }
      />

      {/* fallback */}
      <Route path="/unauthorized" element={<h1>Access Denied</h1>} />
    </Routes>
  );
}

export default App;
