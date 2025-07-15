// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      const snapshot = await getDocs(collection(db, "shows"));
      setMovies(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchShows();
  }, []);

  return (
    <>
      <h2 className="text-center text-blue-600 mt-5 text-4xl animate-bounce">Available Movie Shows</h2>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}
