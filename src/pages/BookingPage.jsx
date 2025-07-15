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
    setSelectedSeats(prev =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
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
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Select Seats for {show.title}</h2>
      <SeatGrid selected={selectedSeats} booked={bookedSeats} onSelect={toggleSeat} />
      {selectedSeats.length > 0 && (
        <div className="mt-6">
          <p>Selected: {selectedSeats.join(", ")}</p>
          <p>Total: ₹{selectedSeats.length * 200}</p>
          <button
            onClick={proceedToPay}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Proceed to Pay
          </button>
        </div>
      )}
    </div>
  );
}