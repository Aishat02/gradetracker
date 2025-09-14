import { Timestamp } from "firebase/firestore";

export type Activity = {
  id: string;
  courseName: string;
  changeLog: string[];
  timestamp: Timestamp;
};
