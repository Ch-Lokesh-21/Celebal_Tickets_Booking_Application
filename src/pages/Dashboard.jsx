// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import jsPDF from "jspdf";
import QRCode from "qrcode";

export default function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const q = query(
        collection(db, "bookings"),
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      setBookings(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    if (user) fetchBookings();
  }, [user]);

  const downloadTicket = async (booking) => {
    const doc = new jsPDF();

    // Generate QR Code from transactionId
    const qrDataUrl = await QRCode.toDataURL(booking.transactionId);

    doc.setFontSize(18);
    doc.text("Movie Ticket", 20, 20);

    doc.setFontSize(12);
    doc.text(`Movie: ${booking.showTitle}`, 20, 40);
    doc.text(`Date: ${booking.date}`, 20, 50);
    doc.text(`Time: ${booking.time}`, 20, 60);
    doc.text(`Seats: ${booking.seats.join(", ")}`, 20, 70);
    doc.text(`Transaction ID: ${booking.transactionId}`, 20, 80);
    doc.text(`Booked On: ${new Date(booking.createdAt).toLocaleString()}`, 20, 90);

    // QR Code
    doc.text("Scan the QR Code: ", 20, 105);
    doc.addImage(qrDataUrl, "PNG", 20, 110, 50, 50);

    // Save PDF
    doc.save(`${booking.showTitle}_Ticket.pdf`);
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-red-500">No bookings yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="border border-gray-200 rounded-xl shadow-md p-5 bg-white hover:shadow-lg transition duration-300"
            >
              <p className="text-lg font-semibold text-blue-700 mb-2">
                🎬 {b.showTitle}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Date & Time:</strong> {b.date} @ {b.time}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Seats:</strong> {b.seats.join(", ")}
              </p>
              <p className="text-sm text-gray-700 mb-1 break-all">
                <strong>Txn ID:</strong>{" "}
                <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                  {b.transactionId}
                </code>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Booked on: {new Date(b.createdAt).toLocaleString()}
              </p>
              <button
                onClick={() => downloadTicket(b)}
                className="mt-3 text-sm text-green-600 font-medium hover:underline cursor-pointer"
              >
                ⬇️ Download Ticket Here
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}