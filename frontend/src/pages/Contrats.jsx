// src/pages/Contrats.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

function Contrats() {
  const [contrats, setContrats] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // Si on part du principe que seul l'admin voit /all
    const fetchContrats = async () => {
      try {
        const res = await fetch(`${API_URL}/api/contrats/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setContrats(data);
        } else {
          setError(data.error || "Erreur lors de la récupération des contrats");
        }
      } catch (err) {
        setError("Erreur réseau");
      }
    };
    fetchContrats();
  }, [token, navigate]);

  return (
    <div className="bg-base-200 min-h-screen">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Contrats ({role})</h1>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>Type</th>
                <th>Prix Total</th>
                <th>Prix Avance</th>
                <th>Délais</th>
              </tr>
            </thead>
            <tbody>
              {contrats.map((c) => (
                <tr key={c._id}>
                  <td>{c.type}</td>
                  <td>{c.prixTotal}</td>
                  <td>{c.prixAvance}</td>
                  <td>{c.delaisTraitement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Contrats;
