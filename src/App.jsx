import React from 'react'
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/SignupPage";
import Login from './pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    
    </Routes>
  );
}

export default App;
