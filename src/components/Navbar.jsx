// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">🎟 TicketApp</Link>
      <div>
        {user ? (
          <>
            <Link to="/dashboard" className="mr-4">Dashboard</Link>
            <Link onClick={logout} to="/" className="bg-red-500 px-4 py-3 rounded cursor-pointer">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register" className="bg-green-500 px-4 py-3 rounded">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}