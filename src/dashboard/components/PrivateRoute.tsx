import { useContext, JSX } from "react";
import { Navigate } from "react-router-dom";
import { DataContext } from "@/shared/context/DataFlow";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useContext(DataContext);

  if (!user) {
    return  <Navigate to="/login" replace/>;
  }

  return children;
};

export default PrivateRoute;
