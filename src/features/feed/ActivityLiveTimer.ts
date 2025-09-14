import { useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";

const ActivityLiveTimer = ({ timestamp }: { timestamp: Timestamp }) => {
  const [timeAgo, setTimeAgo] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const time = timestamp.toDate().getTime();
      const diff = Math.floor((now - time) / 1000); // difference in seconds

      if (diff < 60) {
        setTimeAgo(`${diff} seconds ago`);
      } else if (diff < 3600) {
        const minutes = Math.floor(diff / 60);
        setTimeAgo(`${minutes} minute${minutes > 1 ? "s" : ""} ago`);
      } else if (diff < 86400) {
        const hours = Math.floor(diff / 3600);
        setTimeAgo(`${hours} hour${hours > 1 ? "s" : ""} ago`);
      } else {
        const days = Math.floor(diff / 86400);
        setTimeAgo(`${days} day${days > 1 ? "s" : ""} ago`);
      }
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, [timestamp]);

  return timeAgo;
};

export default ActivityLiveTimer;
