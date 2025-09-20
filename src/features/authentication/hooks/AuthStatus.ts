import { auth } from "../utils/Firebase";
import { useContext, useEffect } from "react";
import { DataContext } from "@/shared/context/DataFlow";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";

const AuthStatus = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(DataContext);

  useEffect(() => {
    const status = onAuthStateChanged(auth, (user:User | null) => {
      if (!user) {
        navigate("/login");
      } else {
        /* According to Firebase Auth docs, both email and displayName can be null */
        setUser({
          uid: user.uid,
          displayName: user.displayName ?? "",
          email: user.email ?? " ",
        });
      }
    });
    return () => status();
  }, [navigate, setUser]);

  return null;
};

export default AuthStatus;
