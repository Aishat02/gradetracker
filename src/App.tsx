import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./assets/styles/app.scss";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "@/landingPage/Home";
import Login from "@/features/authentication/components/Login";
import Dashboard from "@/dashboard/components/Dashboard";
import SignUp from "@/features/authentication/components/SignUp";
import DataFlow from "@/shared/context/DataFlow";
import AuthStatus from "@/dashboard/components/AuthStatus";
import PrivateRoute from "@/dashboard/components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import { JSX } from "react";

export const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <DataFlow>
        <QueryClientProvider client={queryClient}>
          <ToastContainer autoClose={3000} />
          <AuthStatus />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </QueryClientProvider>
      </DataFlow>
    </BrowserRouter>
  );
};

export default App;
