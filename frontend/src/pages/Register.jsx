// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";

// const API_URL = import.meta.env.VITE_API_URL;

// function Register() {
//   const [nom, setNom] = useState("");
//   const [prenom, setPrenom] = useState("");
//   const [passportNumber, setPassportNumber] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     setLoading(true);

//     // Générer automatiquement le mot de passe
//     const password = `${prenom}${nom}`;
//     const numeroClient = passportNumber;

//     try {
//       const response = await fetch(`${API_URL}/api/auth/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           nom,
//           prenom,
//           passportNumber,
//           numeroClient, // Utilisé comme numéro de client
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         console.error("Erreur lors de l'inscription:", data);
//         return;
//       }

//       // Redirection vers la page de connexion après inscription réussie
//       navigate("/login");
//     } catch (error) {
//       console.error("Erreur lors de l'inscription:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-base-200 min-h-screen">
//       <Navbar />
//       <div className="flex flex-col items-center justify-center pt-10">
//         <div className="w-full max-w-sm p-6 bg-white rounded shadow">
//           <h1 className="text-2xl font-bold mb-4 text-center">Inscription</h1>
//           <input
//             type="text"
//             placeholder="Nom"
//             className="input input-bordered w-full mb-4"
//             value={nom}
//             onChange={(e) => setNom(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Prénom"
//             className="input input-bordered w-full mb-4"
//             value={prenom}
//             onChange={(e) => setPrenom(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Numéro de passeport"
//             className="input input-bordered w-full mb-4"
//             value={passportNumber}
//             onChange={(e) => setPassportNumber(e.target.value)}
//           />
//           <button
//             className="btn btn-primary w-full"
//             onClick={handleRegister}
//             disabled={loading}
//           >
//             {loading ? (
//               <span className="loading loading-ring loading-xs"></span>
//             ) : (
//               "S'inscrire"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;

import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function RegisterForm() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [role, setRole] = useState("client");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);

    const password = `${prenom}${nom}`; // Générer automatiquement le mot de passe
    const numeroClient = passportNumber;
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          prenom,
          passportNumber,
          numeroClient,
          password,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Erreur lors de l'inscription:", data);
        return;
      }

      alert("Utilisateur créé avec succès !");
      document.getElementById("addUserModal").close(); // Fermer la modal après succès
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nom"
        className="input input-bordered w-full mb-4"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />
      <input
        type="text"
        placeholder="Prénom"
        className="input input-bordered w-full mb-4"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
      />
      <input
        type="text"
        placeholder="Numéro de passeport"
        className="input input-bordered w-full mb-4"
        value={passportNumber}
        onChange={(e) => setPassportNumber(e.target.value)}
      />
      <select
        className="select select-bordered w-full mb-4"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="client">Client</option>
        <option value="admin">Admin</option>
      </select>
      <button
        className="btn btn-primary w-full"
        onClick={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <span className="loading loading-ring loading-xs"></span>
        ) : (
          "Créer"
        )}
      </button>
    </div>
  );
}

export default RegisterForm;
