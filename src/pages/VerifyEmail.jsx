// src/pages/VerifyEmail.jsx
import { useState } from "react";
import { useAuth } from "../context/useAuth";

export default function VerifyEmail() {
  const { sendVerification } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    try {
      await sendVerification();
      setMessage("Verification email sent successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to send verification email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100 px-4">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4 animate-pulse">
          Verify Your Email
        </h2>
        <p className="text-gray-700 mb-6">
          A verification link has been sent to your email. Please verify your account to continue.
        </p>

        {message && (
          <p className={`mb-4 text-sm font-medium ${message.includes("successfully") ? "text-green-600" : "text-red-500"}`}>
            {message}
          </p>
        )}

        <button
          onClick={handleResend}
          disabled={loading}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition duration-300 shadow-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Resending..." : "Resend Verification Email"}
        </button>
      </div>
    </div>
  );
}