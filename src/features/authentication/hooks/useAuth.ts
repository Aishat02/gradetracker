import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  signupWithEmail,
  loginWithEmail,
  userSignOut,
  signWithGoogle,
  resetPassword,
} from "../utils/FirebaseConfig";
import { UserCredential } from "firebase/auth";
import { AuthFormData } from "@/shared/types/user";

export const useAuth = () => {
  const navigate = useNavigate();
  //Each function just returns a mutation object
  const useEmailLogin = () => {
    return useMutation<UserCredential, Error, AuthFormData>({
      mutationFn: (data) => loginWithEmail(data),
      onSuccess: (user) => {
        toast.success(`Signed in as ${user?.user?.displayName}`, {
          toastId: "Email-signin",
        });
        navigate("/dashboard");
      },
      onError: (error) => {
        toast.error(`Login failed: ${error}`, {
          toastId: "Email-signin-error",
        });
      },
    });
  };

  const useGoogle = () => {
    return useMutation({
      mutationFn: () => signWithGoogle(),
      onSuccess: (user) => {
        toast.success(`Signed in as ${user?.user?.displayName}`, {
          toastId: "Google-signin",
        });
        navigate("/dashboard");
      },
      onError: (error) => {
        toast.error(`Google Authentication failed: ${error}`, {
          toastId: "Google-signin-error",
        });
      },
    });
  };

  const useResetPassword = () => {
    return useMutation({
      mutationFn: (email: string) => resetPassword(email),
      onSuccess: () => {
        toast.success("Check your Email", {
          toastId: "reset-password",
        });
      },
      onError: (error) => {
        toast.error(`Reset Failed: ${error}`, {
          toastId: "reset-password-error",
        });
      },
    });
  };

  const useSignout = () => {
    return useMutation({
      mutationFn: () => userSignOut(),
      onSuccess: () => {
        toast.success("Signed out!", { toastId: "Signout" });
        navigate("/");
      },
      onError: (error) => {
        toast.error(`Failed: ${error.message}`, {
          toastId: "signout-failed",
        });
      },
    });
  };

  const useEmailSignUp = () => {
    return useMutation<UserCredential, Error, AuthFormData>({
      mutationFn: (data) => signupWithEmail(data),
      onSuccess: (user) => {
        toast.success(`Welcome ${user?.user?.displayName || "User"}`, {
          toastId: "Email-signup",
        });
        navigate("/dashboard");
      },
      onError: (error) => {
        toast.error(`Failed: ${error}`, {
          toastId: "email-signin-failed",
        });
      },
    });
  };

  return {
    useEmailLogin,
    useGoogle,
    useResetPassword,
    useSignout,
    useEmailSignUp,
  };
};
