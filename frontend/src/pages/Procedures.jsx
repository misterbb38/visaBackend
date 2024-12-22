// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import CreateProcedureModal from "./CreateProcedureModal";
// import { formatDate } from "../utils"; // Importer la fonction

// const API_URL = import.meta.env.VITE_API_URL;

// function ProceduresList() {
//   const [procedures, setProcedures] = useState([]);
//   const [showCreate, setShowCreate] = useState(false); // Affiche/cacher la modal
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   // Récupérer la liste des procédures
//   const fetchProcedures = async () => {
//     try {
//       const endpoint =
//         role === "admin" ? "/api/procedures/all" : "/api/procedures";
//       const res = await fetch(`${API_URL}${endpoint}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setProcedures(data);
//       } else {
//         setError(data.error || "Erreur lors de la récupération des procédures");
//       }
//     } catch (err) {
//       setError("Erreur réseau");
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//     fetchProcedures();
//   }, [token, navigate]);

//   // Mise à jour d'étape (ex: PUT /api/procedures/:procedureId)
//   const handleUpdateEtape = async (procedureId, nouvelleEtape) => {
//     try {
//       const res = await fetch(`${API_URL}/api/procedures/${procedureId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ nouvelleEtape }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         // Rafraîchir la liste
//         fetchProcedures();
//       } else {
//         setError(data.error || "Erreur mise à jour");
//       }
//     } catch (err) {
//       setError("Erreur réseau");
//     }
//   };

//   return (
//     <div className="bg-base-200 min-h-screen">
//       <Navbar />
//       <div className="p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-2xl font-bold">Liste des procédures</h1>
//           {role === "admin" && (
//             <button
//               className="btn btn-primary"
//               onClick={() => setShowCreate(true)}
//             >
//               Créer procédure
//             </button>
//           )}
//         </div>

//         {error && <p className="text-red-600 mb-2">{error}</p>}

//         <div className="overflow-x-auto">
//           <table className="table w-full table-zebra">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Prénom</th>
//                 <th>Nom du Client</th>
//                 <th>Numéro de Passeport</th>
//                 <th>Contrat</th>
//                 <th>Étape Courante</th>
//                 {role === "admin" && <th>Action</th>}
//               </tr>
//             </thead>
//             <tbody>
//               {procedures.map((proc) => (
//                 <tr key={proc._id}>
//                   <td>{formatDate(proc.createdAt)}</td>
//                   <td>{proc.client?.prenom}</td>
//                   <td>{proc.client?.nom}</td>
//                   <td>{proc.client?.passportNumber}</td>
//                   <td>{proc?.type}</td>
//                   <td>{proc.etapeCourante}</td>
//                   {role === "admin" && (
//                     <td>
//                       <select
//                         className="select select-bordered"
//                         onChange={(e) =>
//                           handleUpdateEtape(proc._id, e.target.value)
//                         }
//                       >
//                         <option value="">Changer étape</option>
//                         {proc.type === "simple" ? (
//                           <>
//                             <option value="traitement_en_cours">
//                               traitement_en_cours
//                             </option>
//                             <option value="contrat_recu">contrat_recu</option>
//                             <option value="fin_du_dossier">
//                               fin_du_dossier
//                             </option>
//                           </>
//                         ) : (
//                           <>
//                             <option value="traitement_en_cours">
//                               traitement_en_cours
//                             </option>
//                             <option value="contrat_recu">contrat_recu</option>
//                             <option value="traitement_visa">
//                               traitement_visa
//                             </option>
//                             <option value="visa_deposer">visa_deposer</option>
//                             <option value="decision_visa">decision_visa</option>
//                           </>
//                         )}
//                       </select>
//                     </td>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Modal de création (admin uniquement) */}
//         {showCreate && role === "admin" && (
//           <CreateProcedureModal
//             onClose={() => setShowCreate(false)}
//             refreshList={fetchProcedures}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProceduresList;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CreateProcedureModal from "./CreateProcedureModal";
import { formatDate } from "../utils";

const API_URL = import.meta.env.VITE_API_URL;

function ProceduresList() {
  const [procedures, setProcedures] = useState([]);
  const [showCreate, setShowCreate] = useState(false); // Affiche/cacher la modal
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

  // Mise à jour d'étape
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
        fetchProcedures(); // Rafraîchir la liste
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {procedures.map((proc) => (
            <div key={proc._id} className="card  shadow-md p-4 rounded-md">
              <h2 className="font-bold text-lg mb-2">
                {proc.client?.prenom} {proc.client?.nom}
              </h2>
              <p className="text-sm mb-2">
                <strong>Date:</strong> {formatDate(proc.createdAt)}
              </p>
              <p className="text-sm mb-2">
                <strong>Numéro Passeport :</strong>{" "}
                {proc.client?.passportNumber}
              </p>
              <p className="text-sm mb-2">
                <strong>Contrat :</strong> {proc.contrat.nom}
              </p>
              <p className="text-sm mb-2">
                <strong>Type de contrat :</strong> {proc.type}
              </p>
              <p className="text-sm mb-2">
                <strong>Étape Courante :</strong> {proc.etapeCourante}
              </p>

              {role === "admin" && (
                <div className="mt-4">
                  <select
                    className="select select-bordered w-full"
                    onChange={(e) =>
                      handleUpdateEtape(proc._id, e.target.value)
                    }
                  >
                    <option value="">Changer étape</option>
                    {proc.type === "simple" ? (
                      <>
                        <option value="traitement_en_cours">
                          traitement_en_cours
                        </option>
                        <option value="contrat_recu">contrat_recu</option>
                        <option value="fin_du_dossier">fin_du_dossier</option>
                      </>
                    ) : (
                      <>
                        <option value="traitement_en_cours">
                          traitement_en_cours
                        </option>
                        <option value="contrat_recu">contrat_recu</option>
                        <option value="traitement_visa">traitement_visa</option>
                        <option value="visa_deposer">visa_deposer</option>
                        <option value="decision_visa">decision_visa</option>
                      </>
                    )}
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal de création (admin uniquement) */}
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

export default ProceduresList;
