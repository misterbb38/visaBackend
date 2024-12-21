// src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Contrats from "./pages/Contrats";
import Procedures from "./pages/Procedures";
import ProtectedRoute from "./components/ProtectedRoute";
import MyProcedures from "./pages/MyProcedures";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Pages protégées */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contrats"
          element={
            <ProtectedRoute>
              <Contrats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/procedures"
          element={
            <ProtectedRoute>
              <Procedures />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myprocedures"
          element={
            <ProtectedRoute>
              <MyProcedures />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
