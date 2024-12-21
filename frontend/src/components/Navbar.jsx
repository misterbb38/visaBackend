// // src/components/Navbar.jsx

// import { Link, useNavigate } from "react-router-dom";
// import { LogOut } from "lucide-react";

// function Navbar() {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/login");
//   };

//   return (
//     <div className="navbar bg-base-100 px-4">
//       <div className="flex-1">
//         <Link to="/dashboard" className="btn btn-ghost normal-case text-xl">
//           Agence Contrats
//         </Link>
//       </div>
//       <div className="flex-none space-x-4">
//         {token && (
//           <>
//             <Link to="/dashboard" className="btn btn-ghost">
//               Dashboard
//             </Link>
//             <Link to="/contrats" className="btn btn-ghost">
//               Contrats
//             </Link>
//             <Link to="/procedures" className="btn btn-ghost">
//               Procedures
//             </Link>
//             <button className="btn btn-outline" onClick={handleLogout}>
//               <LogOut className="mr-2" size={18} /> Déconnexion
//             </button>
//             <input
//               type="checkbox"
//               value="synthwave"
//               className="toggle theme-controller"
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Navbar;

// src/components/Navbar.jsx

import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu } from "lucide-react"; // Menu icon for hamburger

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 px-4">
      {/* Partie gauche : titre/logo */}
      <div className="flex-1">
        <Link
          to="/dashboard"
          className="btn btn-ghost normal-case text-xl font-bold"
        >
          Agence Contrats
        </Link>
      </div>

      {/* Si l'utilisateur est connecté, on affiche le menu (responsive) */}
      {token && (
        <div className="flex-none">
          {/* Menu hamburger (mobile) : visible en lg:hidden */}
          <div className="dropdown dropdown-end lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <Menu size={20} />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/contrats">Contrats</Link>
              </li>
              <li>
                <Link to="/procedures">Procedures</Link>
              </li>
              <li>
                <button onClick={handleLogout}>
                  <LogOut className="mr-2" size={18} /> Déconnexion
                </button>
              </li>
              <li>
                {/* Toggle de thème (optionnel) */}
                <input
                  type="checkbox"
                  value="synthwave"
                  className="toggle theme-controller"
                />
              </li>
            </ul>
          </div>

          {/* Menu desktop : affiché sur grands écrans (hidden sur mobile) */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/dashboard" className="btn btn-ghost">
              Dashboard
            </Link>
            <Link to="/contrats" className="btn btn-ghost">
              Contrats
            </Link>
            <Link to="/procedures" className="btn btn-ghost">
              Procedures
            </Link>
            <Link to="/myprocedures" className="btn btn-ghost">
              Procedures
            </Link>
            <button className="btn btn-outline" onClick={handleLogout}>
              <LogOut className="mr-2" size={18} /> Déconnexion
            </button>
            <input
              type="checkbox"
              value="synthwave"
              className="toggle theme-controller"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
