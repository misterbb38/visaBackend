// src/pages/Dashboard.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="bg-base-200 min-h-screen">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          Bienvenue sur le Dashboard ({role})
        </h1>
        <p className="mt-4">
          Sélectionnez un onglet dans le menu pour gérer vos Contrats ou vos
          Procedures.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
