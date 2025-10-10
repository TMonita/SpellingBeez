import React from 'react'
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/SignupPage";
import Login from './pages/LoginPage';
import Welcome from './pages/welcomePage';
import Play from './pages/PlayPage';
import Result from './pages/ResultPage';
import Profile from './pages/ProfilePage';
import Feedback from './pages/FeedbackPage';
import Admin from './pages/AdminPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/play" element={<Play />} />
      <Route path="/result" element={<Result />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
