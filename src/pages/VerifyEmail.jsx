// src/pages/VerifyEmail.jsx
import { useAuth } from "../context/AuthContext";

export default function VerifyEmail() {
  const { sendVerification } = useAuth();

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
      <p className="mb-4">A verification link has been sent to your email. Please verify your account.</p>
      <button
        onClick={sendVerification}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Resend Verification Email
      </button>
    </div>
  );
}