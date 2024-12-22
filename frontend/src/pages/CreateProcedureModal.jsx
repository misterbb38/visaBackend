import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function CreateProcedureModal({ onClose, refreshList }) {
  const token = localStorage.getItem("token");
  const [contracts, setContracts] = useState([]);
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [contratId, setContratId] = useState("");
  const [message, setMessage] = useState("");

  // Charger la liste des contrats et des clients
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/contrats/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          setContracts(data);
        } else {
          console.error(
            "Erreur : Les données des contrats ne sont pas valides."
          );
          setContracts([]);
        }
      } catch (err) {
        console.error(
          "Erreur réseau lors de la récupération des contrats :",
          err
        );
        setContracts([]);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/api/users/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          setClients(data);
        } else {
          console.error(
            "Erreur : Les données des utilisateurs ne sont pas valides."
          );
          setClients([]);
        }
      } catch (err) {
        console.error(
          "Erreur réseau lors de la récupération des utilisateurs :",
          err
        );
        setClients([]);
      }
    };

    fetchContracts();
    fetchUsers();
  }, [token]);

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
          {Array.isArray(clients) &&
            clients.map((cl) => (
              <option key={cl._id} value={cl._id}>
                {cl.nom} {cl.prenom} - {cl.passportNumber}
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
          {Array.isArray(contracts) &&
            contracts.map((ct) => (
              <option key={ct._id} value={ct._id}>
                {ct.nom} - {ct.type}
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

export default CreateProcedureModal;
