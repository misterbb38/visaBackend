// src/components/Navbar.jsx

import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

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
      <div className="flex-1">
        <Link to="/dashboard" className="btn btn-ghost normal-case text-xl">
          Agence Contrats
        </Link>
      </div>
      <div className="flex-none space-x-4">
        {token && (
          <>
            <Link to="/dashboard" className="btn btn-ghost">
              Dashboard
            </Link>
            <Link to="/contrats" className="btn btn-ghost">
              Contrats
            </Link>
            <Link to="/procedures" className="btn btn-ghost">
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
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
