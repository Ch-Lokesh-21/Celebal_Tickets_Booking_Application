import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import {
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload();
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const logout = () => signOut(auth);
  const sendVerification = () => user && sendEmailVerification(user);

  return (
    <AuthContext.Provider value={{ user, loading, logout, sendVerification }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;