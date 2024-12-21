// // src/pages/Login.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";

// const API_URL = import.meta.env.VITE_API_URL;

// function Login() {
//   const [numeroClient, setNumeroClient] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${API_URL}/api/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ numeroClient, password }),
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         console.error("Erreur de connexion:", data);
//         return;
//       }
//       // Stocker le token
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.role);
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Erreur de connexion:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-base-200 min-h-screen">
//       <Navbar />
//       <div className="flex flex-col items-center justify-center pt-10">
//         <div className="w-full max-w-sm p-6 bg-white rounded shadow">
//           <h1 className="text-2xl font-bold mb-4 text-center">Connexion</h1>
//           <input
//             type="text"
//             placeholder="Numéro client"
//             className="input input-bordered w-full mb-4"
//             value={numeroClient}
//             onChange={(e) => setNumeroClient(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Mot de passe"
//             className="input input-bordered w-full mb-4"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button
//             className="btn btn-primary w-full"
//             onClick={handleLogin}
//             disabled={loading}
//           >
//             {loading ? (
//               <span className="loading loading-ring loading-xs"></span>
//             ) : (
//               "Se connecter"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const [numeroClient, setNumeroClient] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numeroClient, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        console.error("Erreur de connexion:", data);
        return;
      }

      // Stocker le token et le rôle
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Redirection selon le rôle
      if (data.role === "admin") {
        navigate("/dashboard");
      } else if (data.role === "client") {
        navigate("/myprocedures");
      } else {
        // Si d'autres rôles existent, gérer ici ou par défaut
        navigate("/");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-200 min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-10">
        <div className="w-full max-w-sm p-6 bg-white rounded shadow">
          <h1 className="text-2xl font-bold mb-4 text-center">Connexion</h1>
          <input
            type="text"
            placeholder="Numéro client"
            className="input input-bordered w-full mb-4"
            value={numeroClient}
            onChange={(e) => setNumeroClient(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="input input-bordered w-full mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn btn-primary w-full"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-ring loading-xs"></span>
            ) : (
              "Se connecter"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
