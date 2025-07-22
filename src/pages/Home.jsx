import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";
import { CiSearch } from "react-icons/ci";
export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchShows = async () => {
      const snapshot = await getDocs(collection(db, "shows"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Sort shows by date and time (latest first)
      const sorted = data.sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split("-");
        const [dayB, monthB, yearB] = b.date.split("-");
        const dateA = new Date(`${yearA}-${monthA}-${dayA} ${a.time}`);
        const dateB = new Date(`${yearB}-${monthB}-${dayB} ${b.time}`);
        return dateA - dateB;
      });

      setMovies(sorted);
    };

    fetchShows();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h2 className="text-center text-blue-600 mt-6 text-3xl sm:text-4xl font-bold mb-4">
        🎬 Available Movie Shows
      </h2>

      <div className="max-w-2xl mx-auto px-4 mb-6">
        <input
          id="search"
          name="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={"Search Movies... "}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {filteredMovies.length === 0 ? (
        <p className="text-center text-red-500 text-lg">No shows found.</p>
      ) : (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      <Footer/>
    </>
  );
}