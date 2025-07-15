// src/pages/Register.jsx
import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCred.user);
      navigate("/verify-email");
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700 animate-bounce">Register</h2>
      {err && <p className="text-red-500 text-sm">{err}</p>}
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input className="p-2 border rounded" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input className="p-2 border rounded" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">Register</button>
      </form>
    </div>
  );
}