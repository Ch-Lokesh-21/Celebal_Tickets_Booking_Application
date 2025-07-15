// src/pages/Success.jsx
import { useLocation, Link } from "react-router-dom";

export default function Success() {
  const { state } = useLocation();
  const { receipt } = state || {};

  if (!receipt) return <div className="p-6">Invalid receipt.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-green-700 mb-4">🎉 Booking Confirmed!</h2>
      <p>Show: <strong>{receipt.showTitle}</strong></p>
      <p>Date/Time: {receipt.date} @ {receipt.time}</p>
      <p>Seats: {receipt.seats.join(", ")}</p>
      <p>Txn ID: <code>{receipt.transactionId}</code></p>
      <p className="mt-4 text-sm text-gray-600">Receipt saved to your dashboard.</p>
      <Link to="/dashboard" className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded">
        Go to Dashboard
      </Link>
    </div>
  );
}