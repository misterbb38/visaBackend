// // src/pages/Dashboard.jsx
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import RegisterForm from "./Register";

// function Dashboard() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//     }
//   }, [token, navigate]);

//   return (
//     <div className="bg-base-200 min-h-screen">
//       <Navbar />
//       <div className="p-6">
//         <h1 className="text-2xl font-bold">
//           Bienvenue sur le Dashboard ({role})
//         </h1>
//         <p className="mt-4">
//           Sélectionnez un onglet dans le menu pour gérer vos Contrats ou vos
//           Procedures.
//         </p>
//         <RegisterForm />
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RegisterForm from "./Register";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const openModal = () => {
    document.getElementById("addUserModal").showModal();
  };

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

        {/* Bouton Ajouter un utilisateur */}
        {role === "admin" && (
          <button className="btn btn-primary mt-6" onClick={openModal}>
            Ajouter un utilisateur
          </button>
        )}
      </div>

      {/* Modal Ajouter un utilisateur */}
      <dialog id="addUserModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* Bouton fermer */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              type="button"
              onClick={() => document.getElementById("addUserModal").close()}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">Créer un utilisateur</h3>
          <RegisterForm />
        </div>
      </dialog>
    </div>
  );
}

export default Dashboard;
