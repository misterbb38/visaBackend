import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Contrats from "./pages/Contrats";
import Procedures from "./pages/Procedures";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contrats" element={<Contrats />} />
        <Route path="/procedures" element={<Procedures />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
