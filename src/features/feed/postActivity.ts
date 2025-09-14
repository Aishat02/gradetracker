import { database } from "../authentication/utils/Firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { queryClient } from "@/App";

export const postActivity = async (
  courseName: string,
  changeLog: string[]
): Promise<void> => {
  await addDoc(collection(database, "activity"), {
    courseName,
    changeLog,
    timestamp: serverTimestamp(),
  });

  queryClient.invalidateQueries({ queryKey: ["activity", "latest5"] });
};
