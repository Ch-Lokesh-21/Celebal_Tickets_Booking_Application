import { FaRegCopyright } from "react-icons/fa";
import { IoTicketOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-200 text-blue-600 py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-around items-center gap-4 text-center md:text-left">
        {/* Branding */}
        <div>
          <h2 className="text-lg font-bold text-blue-600 flex justify-center items-center gap-1"><IoTicketOutline/> Tickets Booking Application</h2>
          <p className="text-sm text-gray-700 flex justify-center items-center gap-1"><FaRegCopyright/> {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
        </div>
      </div>
    </footer>
  );
}