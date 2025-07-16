// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import jsPDF from "jspdf";
import QRCode from "qrcode";

export default function Mybookings() {
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

    // Generate QR Code for transactionId
    const qrDataUrl = await QRCode.toDataURL(booking.transactionId);

    // Title
    doc.setFontSize(18);
    doc.text("Movie Ticket", 20, 20);

    // Details (Left Side)
    doc.setFontSize(12);
    let y = 40;
    const lineHeight = 10;

    doc.text(`Movie: ${booking.showTitle}`, 20, y);
    y += lineHeight;
    doc.text(`Date: ${booking.date}`, 20, y);
    y += lineHeight;
    doc.text(`Time: ${booking.time}`, 20, y);
    y += lineHeight;
    doc.text(`Seats: ${booking.seats.join(", ")}`, 20, y);
    y += lineHeight;
    doc.text(`Transaction ID:`, 20, y);
    y += 5;
    doc.setFont("courier", "normal"); // monospaced for better alignment
    doc.text(`${booking.transactionId}`, 20, y);
    y += lineHeight + 5;
    doc.setFont("helvetica", "normal");
    doc.text(
      `Booked On: ${new Date(booking.createdAt).toLocaleString()}`,
      20,
      y
    );

    // QR Code (Right Side)
    doc.text("Scan to verify", 140, 40);
    doc.addImage(qrDataUrl, "PNG", 140, 45, 50, 50);

    // Save the PDF
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
