// // MyProcedures.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// // On retire les icônes inutilisées
// // import { FileText, Timer, CheckCircle, AlertTriangle } from 'lucide-react';

// const API_URL = import.meta.env.VITE_API_URL;

// function MyProcedures() {
//   const [procedures, setProcedures] = useState([]);
//   const [error, setError] = useState("");
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//     if (role !== "client") {
//       setError("Vous n'êtes pas autorisé à consulter ces procédures");
//       return;
//     }

//     const fetchProcedures = async () => {
//       try {
//         const res = await fetch(`${API_URL}/api/procedures`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (!res.ok) {
//           setError(
//             data.error || "Erreur lors de la récupération des procédures"
//           );
//           return;
//         }
//         setProcedures(data);
//       } catch (err) {
//         setError("Erreur réseau");
//         console.error(err); // <-- on utilise err
//       }
//     };
//     fetchProcedures();
//   }, [token, role, navigate]);

//   return (
//     <div className="min-h-screen bg-base-200 p-6">
//       <h1 className="text-3xl font-bold mb-6">Suivi de mes procédures</h1>
//       {error && <p className="text-red-600 mb-4">{error}</p>}
//       <div className="grid lg:grid-cols-2 gap-6">
//         {procedures.map((procedure) => (
//           <ProcedureCard key={procedure._id} procedure={procedure} />
//         ))}
//       </div>
//     </div>
//   );
// }

// // On définit ProcedureCard dans le même fichier, par exemple :
// function ProcedureCard({ procedure }) {
//   const { _id, type, etapeCourante } = procedure;

//   const stepsSimple = [
//     "document_deposer",
//     "traitement_en_cours",
//     "contrat_recu",
//     "fin_du_dossier",
//   ];
//   const stepsVisa = [
//     "document_deposer",
//     "traitement_en_cours",
//     "contrat_recu",
//     "traitement_visa",
//     "visa_deposer",
//     "decision_visa",
//   ];

//   const allSteps = type === "simple" ? stepsSimple : stepsVisa;
//   const currentIndex = allSteps.indexOf(etapeCourante);

//   return (
//     <div className="card bg-white shadow p-4">
//       <h2 className="text-lg font-bold mb-4">
//         Procédure #{_id.slice(-5)} -{" "}
//         {type === "simple" ? "Contrat Simple" : "Contrat Visa"}
//       </h2>
//       <div className="steps steps-vertical lg:steps-horizontal">
//         {allSteps.map((step, index) => (
//           <div
//             key={step}
//             className={`step ${index <= currentIndex ? "step-primary" : ""}`}
//           >
//             {step}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MyProcedures;

// src/pages/MyProcedures.jsx

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const API_URL = import.meta.env.VITE_API_URL;

// function MyProcedures() {
//   const [procedures, setProcedures] = useState([]);
//   const [error, setError] = useState("");
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");
//   const navigate = useNavigate();

//   // Bouton Déconnexion
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/login");
//   };

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//     if (role !== "client") {
//       setError("Vous n'êtes pas autorisé à consulter ces procédures");
//       return;
//     }

//     const fetchProcedures = async () => {
//       try {
//         const res = await fetch(`${API_URL}/api/procedures`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (!res.ok) {
//           setError(
//             data.error || "Erreur lors de la récupération des procédures"
//           );
//           return;
//         }
//         setProcedures(data);
//       } catch (err) {
//         setError("Erreur réseau");
//         console.error(err);
//       }
//     };
//     fetchProcedures();
//   }, [token, role, navigate]);

//   return (
//     <div className="min-h-screen bg-base-200 flex flex-col">
//       {/* NAVBAR */}
//       <div className="navbar bg-base-100 px-4 shadow">
//         <div className="flex-1">
//           <h1 className="text-xl font-bold">Suivi de mes procédures</h1>
//         </div>
//         <div>
//           <button className="btn btn-outline" onClick={handleLogout}>
//             Déconnexion
//           </button>
//         </div>
//       </div>

//       {/* CONTENU */}
//       <div className="flex-1 p-6">
//         {error && <p className="text-red-600 mb-4">{error}</p>}

//         <div className="grid lg:grid-cols-2 gap-6">
//           {procedures.map((procedure) => (
//             <ProcedureCard key={procedure._id} procedure={procedure} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // Composant pour chaque procédure
// function ProcedureCard({ procedure }) {
//   const { _id, type, etapeCourante } = procedure;

//   // Étapes d'un contrat simple
//   const stepsSimple = [
//     "document_deposer",
//     "traitement_en_cours",
//     "contrat_recu",
//     "fin_du_dossier",
//   ];

//   // Étapes d'un contrat visa
//   const stepsVisa = [
//     "document_deposer",
//     "traitement_en_cours",
//     "contrat_recu",
//     "traitement_visa",
//     "visa_deposer",
//     "decision_visa",
//   ];

//   // Choix selon le type
//   const allSteps = type === "simple" ? stepsSimple : stepsVisa;
//   const currentIndex = allSteps.indexOf(etapeCourante);

//   return (
//     <div className="card bg-white shadow p-4">
//       <h2 className="text-lg font-bold mb-4">
//         Procédure #{_id.slice(-5)} -{" "}
//         {type === "simple" ? "Contrat Simple" : "Contrat Visa"}
//       </h2>

//       {/* Steps DaisyUI : responsive (vertical sur mobile, horizontal sur lg) */}
//       <div className="steps steps-vertical lg:steps-horizontal">
//         {allSteps.map((step, index) => (
//           <div
//             key={step}
//             className={`step ${index <= currentIndex ? "step-primary" : ""}`}
//           >
//             {step}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MyProcedures;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function MyProcedures() {
  const [procedures, setProcedures] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  // Bouton Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (role !== "client") {
      setError("Vous n'êtes pas autorisé à consulter ces procédures");
      return;
    }

    const fetchProcedures = async () => {
      try {
        const res = await fetch(`${API_URL}/api/procedures`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(
            data.error || "Erreur lors de la récupération des procédures"
          );
          return;
        }
        setProcedures(data);
      } catch (err) {
        setError("Erreur réseau");
        console.error(err);
      }
    };
    fetchProcedures();
  }, [token, role, navigate]);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* NAVBAR */}
      <div className="navbar bg-base-100 px-4 shadow">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Suivi de mes procédures</h1>
        </div>
        <div>
          <button className="btn btn-outline" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </div>

      {/* CONTENU */}
      <div className="flex-1 p-6">
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="grid lg:grid-cols-2 gap-6">
          {procedures.map((procedure) => (
            <ProcedureCard key={procedure._id} procedure={procedure} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Composant pour chaque procédure
function ProcedureCard({ procedure }) {
  const { _id, type, etapeCourante } = procedure;

  // Étapes d'un contrat simple
  const stepsSimple = [
    "document_deposer",
    "traitement_en_cours",
    "contrat_recu",
    "fin_du_dossier",
  ];

  // Étapes d'un contrat visa
  const stepsVisa = [
    "document_deposer",
    "traitement_en_cours",
    "contrat_recu",
    "traitement_visa",
    "visa_deposer",
    "decision_visa",
  ];

  // Choix selon le type
  const allSteps = type === "simple" ? stepsSimple : stepsVisa;
  const currentIndex = allSteps.indexOf(etapeCourante);

  return (
    <div className="card bg-white shadow p-4">
      <h2 className="text-lg font-bold mb-4">
        Procédure #{_id.slice(-5)} -{" "}
        {type === "simple" ? "Contrat Simple" : "Contrat Visa"}
      </h2>

      {/* Steps DaisyUI : responsive (vertical sur mobile, horizontal sur lg) */}
      <div
        className="steps steps-vertical lg:steps-horizontal"
        style={{ maxWidth: "100%", overflowX: "auto" }}
      >
        {allSteps.map((step, index) => (
          <div
            key={step}
            className={`step ${
              index <= currentIndex ? "step-primary" : ""
            } text-center`}
            style={{ minWidth: "150px" }} // Largeur minimale pour éviter le chevauchement
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyProcedures;
