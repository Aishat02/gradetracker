import { auth } from "../../features/authentication/utils/Firebase";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "@/shared/context/DataFlow";
import { onAuthStateChanged, User } from "firebase/auth";
import { LoadingSpinner } from "@/dashboard/components/MotionAnimations";

const AuthStatus = () => {
  const { setUser } = useContext(DataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const status = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser({
          uid: user.uid,
          displayName: user.displayName ?? "",
          email: user.email ?? " ",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => status();
  }, [setUser]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <LoadingSpinner />
      </div>
    );
  }
};

export default AuthStatus;
