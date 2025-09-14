import { database } from "../authentication/utils/Firebase";
import { Activity } from "@/shared/types/activity";
import {
  collection,
  query,
  orderBy,
  limit,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import AuthError from "../authentication/utils/AuthError";

export const createDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
    return { id: docRef.id, ...data };
  } catch (error: unknown) {
    throw AuthError(error);
  }
};

export const getDocuments = async (collectionName: string) => {
  try {
    const docSnap = await getDocs(collection(database, collectionName));
    const documentCollection = docSnap.docs.map((response) => ({
      id: response.id,
      ...response.data(),
    }));
    return documentCollection;
  } catch (error: unknown) {
    throw AuthError(error);
  }
};

export const getActivity = async () => {
  const activity = query(
    collection(database, "activity"),
    orderBy("timestamp", "desc"),
    limit(5)
  );

  const docSnap = await getDocs(activity);
  return docSnap.docs.map(
    (response) =>
      ({
        id: response.id,
        ...response.data(),
      }) as Activity
  );
};

export const getDocument = async (collectionName: string, userId: string) => {
  try {
    const docRef = doc(database, collectionName, userId);
    const preference = await getDoc(docRef);
    if (!preference?.exists()) {
      const defaultSettings = {
        cgpa: 0.0,
        coursesCompleted: 0,
        courseCreditsCompleted: 0,
        remainingCourses: 40,
      };
      await setDoc(docRef, defaultSettings);
      return defaultSettings;
    } else {
      return preference.data();
    }
  } catch (error: unknown) {
    throw AuthError(error);
  }
};

export const updateDocument = async (
  collectionName: string,
  id: string,
  data: any
) => {
  try {
    await updateDoc(doc(database, collectionName, id), data);
    return data;
  } catch (error: unknown) {
    throw AuthError(error);
  }
};

export const deleteDocument = async <T extends { id: string }>(
  collectionName: string,
  data: T
): Promise<T> => {
  try {
    await deleteDoc(doc(database, collectionName, data.id));
    return data;
  } catch (error: unknown) {
    throw AuthError(error);
  }
};
