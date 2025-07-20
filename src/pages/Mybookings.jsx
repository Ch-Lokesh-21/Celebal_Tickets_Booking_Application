// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../context/useAuth";
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
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Sort bookings by show date and time (latest first)
      const sorted = data.sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split("-");
        const [dayB, monthB, yearB] = b.date.split("-");
        const dateA = new Date(`${yearA}-${monthA}-${dayA} ${a.time}`);
        const dateB = new Date(`${yearB}-${monthB}-${dayB} ${b.time}`);
        return dateA - dateB;
      });

      setBookings(sorted);
    };

    if (user) fetchBookings();
  }, [user]);

  const formatTime = (time24) => {
    const [hour, minute] = time24.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  const downloadTicket = async (booking) => {
    const doc = new jsPDF();
    const qrDataUrl = await QRCode.toDataURL(booking.transactionId);

    doc.setFontSize(18);
    doc.text("Movie Ticket", 20, 20);
    doc.setFontSize(12);
    let y = 40;
    const lineHeight = 10;

    doc.text(`Movie: ${booking.showTitle}`, 20, y);
    y += lineHeight;
    doc.text(`Date: ${booking.date}`, 20, y);
    y += lineHeight;
    doc.text(`Time: ${formatTime(booking.time)}`, 20, y);
    y += lineHeight;
    doc.text(`Seat Numbers: ${booking.seats.join(", ")}`, 20, y);
    y += lineHeight;
    doc.text(`Transaction ID:`, 20, y);
    y += 5;
    doc.setFont("courier", "normal");
    doc.text(`${booking.transactionId}`, 20, y);
    y += lineHeight + 5;
    doc.setFont("helvetica", "normal");
    doc.text(
      `Booked On: ${new Date(booking.createdAt).toLocaleString()}`,
      20,
      y
    );

    doc.text("Scan to verify", 140, 40);
    doc.addImage(qrDataUrl, "PNG", 140, 45, 50, 50);
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
              className="border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg transition duration-300 overflow-hidden flex flex-col"
            >
              <img
                src={
                  b.showPoster ||
                  ""
                }
                alt={b.showTitle}
                className="h-40 w-full object-cover"
              />
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <p className="text-lg font-semibold text-blue-700 mb-2">
                    🎬 {b.showTitle}
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    <strong>Date & Time:</strong> {b.date} @ {formatTime(b.time)}
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    <strong>Seat Numbers:</strong> {b.seats.join(", ")}
                  </p>
                  <p className="text-sm text-gray-700 mb-1 break-all">
                    <strong>Payment ID:</strong>{" "}
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                      {b.transactionId}
                    </code>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Booked on: {new Date(b.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => downloadTicket(b)}
                  className="mt-4 text-sm text-green-600 font-medium hover:underline cursor-pointer"
                >
                  ⬇️ Download Ticket Here
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
