// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md px-4 py-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🎟 Tickets Booking Application
        </Link>

        {/* Links */}
        <div className="flex items-center gap-4 text-sm sm:text-base">
          {user ? (
            <>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition hover:underline"
              >
                Book
              </Link>
              <Link
                to="/myBookings"
                className="text-gray-700 hover:text-blue-600 transition hover:underline"
              >
                My Bookings
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md transition cursor-pointer duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}