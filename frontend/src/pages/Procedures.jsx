// src/pages/Procedures.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

function Procedures() {
  const [procedures, setProcedures] = useState([]);
  const [showCreate, setShowCreate] = useState(false); // pour afficher/cacher le formulaire
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Récupérer la liste des procédures
  const fetchProcedures = async () => {
    try {
      const endpoint =
        role === "admin" ? "/api/procedures/all" : "/api/procedures";
      const res = await fetch(`${API_URL}${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setProcedures(data);
      } else {
        setError(data.error || "Erreur lors de la récupération des procédures");
      }
    } catch (err) {
      setError("Erreur réseau");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchProcedures();
  }, [token, navigate]);

  // Mise à jour d'étape (ex: PUT /api/procedures/:procedureId)
  const handleUpdateEtape = async (procedureId, nouvelleEtape) => {
    try {
      const res = await fetch(`${API_URL}/api/procedures/${procedureId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nouvelleEtape }),
      });
      const data = await res.json();
      if (res.ok) {
        // Refresh
        fetchProcedures();
      } else {
        setError(data.error || "Erreur mise à jour");
      }
    } catch (err) {
      setError("Erreur réseau");
    }
  };

  return (
    <div className="bg-base-200 min-h-screen">
      <Navbar />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Liste des procédures</h1>
          {role === "admin" && (
            <button
              className="btn btn-primary"
              onClick={() => setShowCreate(true)}
            >
              Créer procédure
            </button>
          )}
        </div>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Contrat</th>
                <th>Étape Courante</th>
                {role === "admin" && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {procedures.map((proc) => (
                <tr key={proc._id}>
                  <td>{proc._id}</td>
                  <td>{proc.client?.numeroClient}</td>
                  <td>{proc.contrat?.type}</td>
                  <td>{proc.etapeCourante}</td>
                  {role === "admin" && (
                    <td>
                      <select
                        className="select select-bordered"
                        onChange={(e) =>
                          handleUpdateEtape(proc._id, e.target.value)
                        }
                      >
                        <option value="">Changer étape</option>
                        <option value="traitement_en_cours">
                          traitement_en_cours
                        </option>
                        <option value="contrat_recu">contrat_recu</option>
                        <option value="traitement_visa">traitement_visa</option>
                        <option value="visa_deposer">visa_deposer</option>
                        <option value="decision_visa">decision_visa</option>
                        <option value="fin_du_dossier">fin_du_dossier</option>
                      </select>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Formulaire de création (admin) */}
        {showCreate && role === "admin" && (
          <CreateProcedureModal
            onClose={() => setShowCreate(false)}
            refreshList={fetchProcedures}
          />
        )}
      </div>
    </div>
  );
}

// On intègre ce composant ici pour plus de lisibilité :
function CreateProcedureModal({ onClose, refreshList }) {
  const token = localStorage.getItem("token");
  const [contracts, setContracts] = useState([]);
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [contratId, setContratId] = useState("");
  const [message, setMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  // Charger la liste des contrats et des clients
  useEffect(() => {
    const fetchContracts = async () => {
      const res = await fetch(`${API_URL}/api/contrats/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setContracts(data);
    };
    const fetchUsers = async () => {
      const res = await fetch(`${API_URL}/api/users/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setClients(data);
    };
    fetchContracts();
    fetchUsers();
  }, [API_URL, token]);

  const handleCreateProcedure = async () => {
    try {
      const res = await fetch(`${API_URL}/api/procedures`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ clientId, contratId }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Procédure créée avec succès !");
        refreshList();
        setClientId("");
        setContratId("");
      } else {
        setMessage(data.error || "Erreur lors de la création");
      }
    } catch (err) {
      setMessage("Erreur réseau");
    }
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded shadow w-full max-w-md relative">
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="text-xl font-bold mb-4">Créer une procédure</h3>

        <label className="label">Choisir un client :</label>
        <select
          className="select select-bordered w-full mb-4"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
        >
          <option value="">Sélectionner un client</option>
          {clients.map((cl) => (
            <option key={cl._id} value={cl._id}>
              {cl.numeroClient} (role: {cl.role})
            </option>
          ))}
        </select>

        <label className="label">Choisir un contrat :</label>
        <select
          className="select select-bordered w-full mb-4"
          value={contratId}
          onChange={(e) => setContratId(e.target.value)}
        >
          <option value="">Sélectionner un contrat</option>
          {contracts.map((ct) => (
            <option key={ct._id} value={ct._id}>
              {ct.type} - {ct.prixTotal}€
            </option>
          ))}
        </select>

        <button
          className="btn btn-primary w-full"
          onClick={handleCreateProcedure}
        >
          Créer
        </button>
        {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
      </div>
    </div>
  );
}

export default Procedures;
