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

  const [selectedContrat, setSelectedContrat] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

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

  const handleDelete = async (contratId) => {
    try {
      const res = await fetch(`${API_URL}/api/contrats/${contratId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setContrats(contrats.filter((c) => c._id !== contratId));
      } else {
        const data = await res.json();
        alert(data.error || "Erreur lors de la suppression du contrat");
      }
    } catch (err) {
      alert("Erreur réseau");
    }
  };

  const openModal = () =>
    document.getElementById("addContratModal").showModal();
  const openUpdateModal = (contrat) => {
    setSelectedContrat(contrat);
    document.getElementById("updateContratModal").showModal();
  };

  return (
    <div className="bg-base-200 min-h-screen">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Contrats ({role})</h1>
        {error && <p className="text-red-600 mb-2">{error}</p>}

        {role === "admin" && (
          <button className="btn btn-primary mb-4" onClick={openModal}>
            Ajouter un contrat
          </button>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contrats.map((c) => (
            <div key={c._id} className="card  shadow-md p-4">
              <h2 className="font-bold text-lg">{c.nom}</h2>
              <p className="text-sm">
                <strong>Type :</strong> {c.type}
              </p>
              <p className="text-sm">
                <strong>Prix Total :</strong> {c.prixTotal}€
              </p>
              <p className="text-sm">
                <strong>Prix Avance :</strong> {c.prixAvance}€
              </p>
              <p className="text-sm">
                <strong>Délais :</strong> {c.delaisTraitement} jours
              </p>
              {role === "admin" && (
                <div className="mt-4 space-x-2">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => openUpdateModal(c)}
                  >
                    Modifier
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(c._id)}
                  >
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal Ajouter Contrat */}
      <AddContratModal setContrats={setContrats} />

      {/* Modal Modifier Contrat */}
      <UpdateContratModal
        selectedContrat={selectedContrat}
        setContrats={setContrats}
      />
    </div>
  );
}

function AddContratModal({ setContrats }) {
  const [nom, setNom] = useState("");
  const [type, setType] = useState("simple");
  const [prixTotal, setPrixTotal] = useState("");
  const [prixAvance, setPrixAvance] = useState("");
  const [delaisTraitement, setDelaisTraitement] = useState("");
  const token = localStorage.getItem("token");

  const handleAddContrat = async () => {
    try {
      const res = await fetch(`${API_URL}/api/contrats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nom,
          type,
          prixTotal,
          prixAvance,
          delaisTraitement,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setContrats((prev) => [...prev, data]);
        document.getElementById("addContratModal").close();
      } else {
        alert(data.error || "Erreur lors de l'ajout du contrat");
      }
    } catch (err) {
      alert("Erreur réseau");
    }
  };

  return (
    <dialog id="addContratModal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Ajouter un contrat</h3>
        <input
          type="text"
          placeholder="Nom"
          className="input input-bordered w-full mb-4"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <select
          className="select select-bordered w-full mb-4"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="simple">Simple</option>
          <option value="visa">Visa</option>
        </select>
        <input
          type="number"
          placeholder="Prix Total"
          className="input input-bordered w-full mb-4"
          value={prixTotal}
          onChange={(e) => setPrixTotal(e.target.value)}
        />
        <input
          type="number"
          placeholder="Prix Avance"
          className="input input-bordered w-full mb-4"
          value={prixAvance}
          onChange={(e) => setPrixAvance(e.target.value)}
        />
        <input
          type="number"
          placeholder="Délais (jours)"
          className="input input-bordered w-full mb-4"
          value={delaisTraitement}
          onChange={(e) => setDelaisTraitement(e.target.value)}
        />
        <button className="btn btn-primary w-full" onClick={handleAddContrat}>
          Ajouter
        </button>
      </div>
    </dialog>
  );
}

function UpdateContratModal({ selectedContrat, setContrats }) {
  const [nom, setNom] = useState("");
  const [type, setType] = useState("simple");
  const [prixTotal, setPrixTotal] = useState("");
  const [prixAvance, setPrixAvance] = useState("");
  const [delaisTraitement, setDelaisTraitement] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (selectedContrat) {
      setNom(selectedContrat.nom);
      setType(selectedContrat.type);
      setPrixTotal(selectedContrat.prixTotal);
      setPrixAvance(selectedContrat.prixAvance);
      setDelaisTraitement(selectedContrat.delaisTraitement);
    }
  }, [selectedContrat]);

  const handleUpdateContrat = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/contrats/${selectedContrat._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nom,
            type,
            prixTotal,
            prixAvance,
            delaisTraitement,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setContrats((prev) =>
          prev.map((c) => (c._id === selectedContrat._id ? data : c))
        );
        document.getElementById("updateContratModal").close();
      } else {
        alert(data.error || "Erreur lors de la mise à jour du contrat");
      }
    } catch (err) {
      alert("Erreur réseau");
    }
  };

  return (
    <dialog id="updateContratModal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Modifier le contrat</h3>
        <input
          type="text"
          placeholder="Nom"
          className="input input-bordered w-full mb-4"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <select
          className="select select-bordered w-full mb-4"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="simple">Simple</option>
          <option value="visa">Visa</option>
        </select>
        <input
          type="number"
          placeholder="Prix Total"
          className="input input-bordered w-full mb-4"
          value={prixTotal}
          onChange={(e) => setPrixTotal(e.target.value)}
        />
        <input
          type="number"
          placeholder="Prix Avance"
          className="input input-bordered w-full mb-4"
          value={prixAvance}
          onChange={(e) => setPrixAvance(e.target.value)}
        />
        <input
          type="number"
          placeholder="Délais (jours)"
          className="input input-bordered w-full mb-4"
          value={delaisTraitement}
          onChange={(e) => setDelaisTraitement(e.target.value)}
        />
        <button
          className="btn btn-primary w-full"
          onClick={handleUpdateContrat}
        >
          Mettre à jour
        </button>
      </div>
    </dialog>
  );
}

export default Contrats;
