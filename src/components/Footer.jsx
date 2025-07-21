import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-200 text-blue-600 py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        {/* Branding */}
        <div>
          <h2 className="text-lg font-bold text-blue-600">🎟 Ticket Booking App</h2>
          <p className="text-sm text-gray-700">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-xl">
          <a href="#" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="#"  rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}