// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      setBookings(snapshot.docs.map(doc => doc.data()));
    };
    if (user) fetchBookings();
  }, [user]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b.id} className="border p-4 rounded shadow">
              <p><strong>{b.showTitle}</strong> — {b.date} @ {b.time}</p>
              <p>Seats: {b.seats.join(", ")}</p>
              <p>Txn ID: <code>{b.transactionId}</code></p>
              <p>Date: {new Date(b.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}