import { useActivityFeed } from "../database/useCRUD";
import ActivityLiveTimer from "./ActivityLiveTimer";
import { LoadingSpinner } from "@/dashboard/components/MotionAnimations";

const ActivityFeed = () => {
  const { data, isLoading } = useActivityFeed();

  return (
    <div className="bg-white container-fluid p-4 my-4 rounded-3">
      <h5 className="mb-3">Recent Activity</h5>
      <div className="d-flex flex-column gap-3">
        {isLoading ? (
          <LoadingSpinner />
        ) : data && data.length > 0 ? (
          data.map((activity) => (
            <div key={activity.id} className="border-bottom pb-2">
              <strong>{activity.courseName}</strong>
              <ul className="small mb-1">
                {activity.changeLog?.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
              <div className="text-muted small">
                {activity.timestamp && (
                  <ActivityLiveTimer timestamp={activity.timestamp} />
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No activity yet...</p>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
