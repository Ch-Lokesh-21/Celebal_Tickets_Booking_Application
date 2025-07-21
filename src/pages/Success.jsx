import { useLocation, Link } from "react-router-dom";

export default function Success() {
  const { state } = useLocation();
  const { receipt } = state || {};

  if (!receipt) return <div className="p-6 text-center text-red-600 font-semibold">Invalid receipt.</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="text-green-600 text-4xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-green-700 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-700 mb-6">Your ticket has been successfully booked.</p>

        <div className="bg-gray-50 rounded-lg p-4 text-left text-sm sm:text-base space-y-2 shadow-inner">
          <p>
            <span className="font-semibold text-gray-600">Show:</span>{" "}
            <span className="text-gray-800">{receipt.showTitle}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-600">Date/Time:</span>{" "}
            <span className="text-gray-800">{receipt.date} @ {receipt.time}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-600">Seats:</span>{" "}
            <span className="text-gray-800">{receipt.seats.join(", ")}</span>
          </p>
          <p className="break-words">
            <span className="font-semibold text-gray-600">Transaction ID:</span>{" "}
            <code className="bg-gray-200 px-1 py-0.5 rounded text-gray-800">{receipt.transactionId}</code>
          </p>
        </div>

        <p className="mt-6 text-sm text-gray-600">
          🎫 This receipt is saved to My Bookings.
        </p>

        <Link
          to="/myBookings"
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition"
        >
          Go to My Bookings
        </Link>
      </div>
    </div>
  );
}