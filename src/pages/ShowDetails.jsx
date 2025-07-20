// src/pages/ShowDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../components/Loader";

export default function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShow = async () => {
      const ref = doc(db, "shows", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setShow({ id: snap.id, ...snap.data() });
      }
    };
    fetchShow();
  }, [id]);

  if (!show) return <Loader />;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto flex flex-col gap-6 justify-center items-center">
      {/* Poster Image */}
      <div className="w-full md:w-1/2">
        <img
          src={show.poster}
          alt={show.title}
          className="w-full max-h-[500px] object-cover rounded-xl shadow-md"
        />
      </div>

      {/* Show Details */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            {show.title}
          </h2>
          <p className="text-gray-600 text-sm mb-4">{show.description}</p>
          <p className="text-md font-medium text-gray-700">
            {show.date} @ {show.time}
          </p>
        </div>

        {/* Select Seats Button */}
        <button
          onClick={() => navigate("/book", { state: { show } })}
          className="mt-6 w-full md:w-auto bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 cursor-pointer duration-300"
        >
          Select Seats
        </button>
      </div>
    </div>
  );
}
