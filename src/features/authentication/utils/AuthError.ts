import { FirebaseError } from "firebase/app";

const AuthError = (error: unknown): Error => {
  const errorMessage: Record<string, string> = {
    // Reset password
    "auth/missing-email": "Please enter your email address.",
    "auth/invalid-email": "Invalid email address. Please check and try again.",
    // Reset password, Login, Signup
    "auth/network-request-failed":
      "Network Error. Check internet connection and try again",
    "auth/too-many-requests": "Too many attempts. Try again later!",
    "auth/wrong-password": "Incorrect password!",
    // Google
    "auth/cancelled-popup-request": "A popup window is already open.",
    "auth/popup-closed-by-user": "Sign-in canceled",
    "auth/popup-blocked":
      "Your browser blocked the popup. Enable popups to sign in with Google and try again!",
    // email
    "auth/user-not-found": "User does not exist. Please sign up first!",
    "auth/email-already-in-use": "This email is already registered.",
  };

  if (error instanceof FirebaseError) {
    return new Error(errorMessage[error.code] || error.message);
  }
  return new Error("Something went wrong");
};
export default AuthError;
