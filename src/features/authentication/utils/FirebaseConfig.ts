import { auth } from "./Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { AuthFormData } from "@/shared/types/user";
import AuthError from "./AuthError";

export const signupWithEmail = async (data: AuthFormData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    await updateProfile(userCredential.user, {
      displayName: `${data.firstname} ${data.lastname}`,
    });
    return userCredential;
  } catch (error: unknown) {
    throw AuthError(error);
  }
};

export const loginWithEmail = async (data: AuthFormData) => {
  try {
    return await signInWithEmailAndPassword(auth, data.email, data.password);
  } catch (error: unknown) {
    throw AuthError(error);
  }
};

export const resetPassword = async (userEmail: string) => {
  try {
    return await sendPasswordResetEmail(auth, userEmail);
  } catch (error: unknown) {
    throw AuthError(error);
  }
};

export const signWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  } catch (error: unknown) {
    throw AuthError(error);
  }
};

export const userSignOut = async () => {
  try {
    return await signOut(auth);
  } catch (error: unknown) {
    throw AuthError(error);
  }
};
