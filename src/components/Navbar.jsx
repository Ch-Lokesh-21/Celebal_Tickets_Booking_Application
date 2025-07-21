import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white shadow-md px-4 py-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold text-blue-600"
          onClick={closeMenu}
        >
          🎟 Tickets Booking Application
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl text-blue-600 cursor-pointer">
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm sm:text-base">
          {user ? (
            <>
              <Link
                to="/"
                className="text-blue-600 transition hover:underline duration-300"
              >
                Book
              </Link>
              <Link
                to="/myBookings"
                className="text-blue-600 transition hover:underline duration-300"
              >
                My Bookings
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
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

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-3 text-center text-sm sm:text-base">
          {user ? (
            <>
              <Link
                to="/"
                onClick={closeMenu}
                className="block text-gray-700 hover:text-blue-600 transition hover:underline"
              >
                Book
              </Link>
              <Link
                to="/myBookings"
                onClick={closeMenu}
                className="block text-gray-700 hover:text-blue-600 transition hover:underline"
              >
                My Bookings
              </Link>
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="w-full bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="block text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}