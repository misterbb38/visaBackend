import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

function CreateProcedure() {
  const [clientId, setClientId] = useState("");
  const [contratId, setContratId] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleCreate = async () => {
    try {
      const response = await fetch(`${API_URL}/procedures`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ clientId, contratId }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Procédure créée avec succès !");
        setClientId("");
        setContratId("");
      } else {
        setMessage(data.error || "Erreur lors de la création de la procédure");
      }
    } catch (error) {
      console.error(error);
      setMessage("Erreur réseau");
    }
  };

  return (
    <div className="bg-base-200 min-h-screen">
      <Navbar />
      <div className="p-6">
        <button
          className="btn btn-outline mb-4"
          onClick={() => navigate("/dashboard")}
        >
          &larr; Retour Dashboard
        </button>
        <h1 className="text-2xl font-bold mb-4">
          Créer une nouvelle procédure
        </h1>
        <div className="max-w-md bg-white p-4 rounded shadow">
          <div className="mb-4">
            <label className="label">Client ID</label>
            <input
              type="text"
              placeholder="Entrez l'ID du client"
              className="input input-bordered w-full"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="label">Contrat ID</label>
            <input
              type="text"
              placeholder="Entrez l'ID du contrat"
              className="input input-bordered w-full"
              value={contratId}
              onChange={(e) => setContratId(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-full" onClick={handleCreate}>
            Créer
          </button>
          {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default CreateProcedure;
