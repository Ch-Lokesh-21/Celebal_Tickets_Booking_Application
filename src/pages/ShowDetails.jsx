// src/pages/ShowDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

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

  if (!show) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img src={show.poster} alt={show.title} className="w-full rounded" />
      <h2 className="text-2xl font-bold mt-4">{show.title}</h2>
      <p className="text-gray-600">{show.description}</p>
      <p className="mt-2">{show.date} @ {show.time}</p>
      <button
        onClick={() => navigate("/book", { state: { show } })}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Select Seats
      </button>
    </div>
  );
}