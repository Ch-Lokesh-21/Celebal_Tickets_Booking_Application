import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import ShowDetails from "./pages/ShowDetails";
import BookingPage from "./pages/BookingPage";
import Mybookings from "./pages/Mybookings";
import Success from "./pages/Success";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/show/:id" element={<ProtectedRoute><ShowDetails /></ProtectedRoute>} />
        <Route path="/book" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
        <Route path="/myBookings" element={<ProtectedRoute><Mybookings /></ProtectedRoute>} />
        <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}