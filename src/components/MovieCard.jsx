// src/components/MovieCard.jsx
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <div className="border-none rounded p-4 shadow-2xl flex-col flex justify-between">
      <img src={movie.poster} alt={movie.title} className="w-full h-48 object-cover rounded" />
      <h3 className="font-semibold text-lg mt-2">{movie.title}</h3>
      <p className="text-sm text-gray-600">{movie.description}</p>
      <p className="text-sm mt-1">{movie.date} @ {movie.time}</p>
      <Link to={`/show/${movie.id}`}>
        <button className="bg-blue-500 text-white mt-3 px-4 py-2 rounded w-full cursor-pointer hover:bg-blue-600 duration-300">Book Now</button>
      </Link>
    </div>
  );
}