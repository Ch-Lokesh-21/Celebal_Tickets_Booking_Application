// src/components/MovieCard.jsx
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <div className="border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden flex flex-col transition-transform duration-300 hover:scale-[1.02]">
      
      {/* Poster Image */}
      <div className="relative w-full h-56 sm:h-64 md:h-72 bg-gray-100">
        <img
          src={movie.poster || "https://via.placeholder.com/400x600?text=No+Image"}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Movie Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg text-blue-700 mb-1">{movie.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{movie.description}</p>
        <p className="text-sm mt-2 text-gray-800 font-medium">
          📅 {movie.date} @ {movie.time}
        </p>

        <Link to={`/show/${movie.id}`} className="mt-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
}