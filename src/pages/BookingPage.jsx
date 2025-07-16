// src/pages/BookingPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import SeatGrid from "../components/SeatGrid";
import { initiatePayment } from "../utils/razorpay";

export default function BookingPage() {
  const { state } = useLocation();
  const { show } = state || {};
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const fetchSeats = async () => {
      const docSnap = await getDoc(doc(db, "shows", show.id));
      if (docSnap.exists()) {
        setBookedSeats(docSnap.data().bookedSeats || []);
      }
    };
    if (show?.id) fetchSeats();
  }, [show?.id]);

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handlePaymentSuccess = async (response) => {
    const bookingId = `${user.uid}_${Date.now()}`;
    const receipt = {
      id: bookingId,
      userId: user.uid,
      userEmail: user.email,
      showId: show.id,
      showTitle: show.title,
      date: show.date,
      time: show.time,
      seats: selectedSeats,
      transactionId: response.razorpay_payment_id,
      createdAt: new Date().toISOString(),
    };

    await updateDoc(doc(db, "shows", show.id), {
      bookedSeats: arrayUnion(...selectedSeats),
    });

    await setDoc(doc(db, "bookings", bookingId), receipt);

    navigate("/success", { state: { receipt } });
  };

  const proceedToPay = () => {
    const amount = selectedSeats.length * 300;
    initiatePayment({
      amount,
      bookingDetails: {
        userName: user.displayName || user.email,
        userEmail: user.email,
      },
      onSuccess: handlePaymentSuccess,
    });
  };

  if (!show) return <div className="p-6">Invalid show data.</div>;

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Select Seats for {show.title} Movie
      </h2>

      {/* Screen indicator */}
      <div className="bg-gray-300 text-center text-sm py-2 rounded mb-6">
        Your Screen is Here
      </div>

      {/* Seat grid */}
      <div className="overflow-x-auto">
        <SeatGrid
          selected={selectedSeats}
          booked={bookedSeats}
          onSelect={toggleSeat}
        />
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-gray-300 border" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-green-600" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-red-500" />
          <span>Booked</span>
        </div>
      </div>

      {/* Summary + button */}
      {selectedSeats.length > 0 && (
        <div className="mt-4 text-center grid gap-4 sm:grid-cols-1 lg:grid-cols-3 items-center justify-center">
          <p className="font-medium col-span-1 text-center">
            Selected: {selectedSeats.join(", ")}
          </p>
          <p className="font-medium col-span-1 text-center">
            Total: ₹{selectedSeats.length * 200}
          </p>
          <button
            onClick={proceedToPay}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300 col-span-1 mx-auto cursor-pointer"
          >
            Proceed to Pay
          </button>
        </div>
      )}
    </div>
  );
}
