import { useReadDoc } from "@/features/database/useCRUD";
import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  Trophy,
  NotebookPen,
  CheckCircle2,
  Hourglass,
  FolderArchive,
  Database,
} from "lucide-react";
import { FaUserGraduate } from "react-icons/fa";
import { DataContext } from "@/shared/context/DataFlow";
import { LoadingSpinner } from "./MotionAnimations";
import HonorsCalculator from "../utils/HonorsCalculator";
import ActivityFeed from "@/features/feed/ActivityFeed";
import CourseOverview from "./CourseOverview";
import { Course } from "@/shared/types/course";

const UserHome = () => {
  const { user, courseList } = useContext(DataContext);
  const { data, isError, error, isFetching } = useReadDoc(
    "settings",
    user?.uid
  );

  const [expandCourse, setExpandCourse] = useState<string | boolean>(false);
  const [searchList, setSearchList] = useState<Course[] | null>(null);

  const findCourse = (name: string) => {
    const result = courseList.filter((course) =>
      course?.name.toLowerCase().includes(name.toLowerCase())
    );
    setSearchList(result);
  };

  const activeCourseCredits = courseList.reduce((sum, course) => {
    return sum + Number(course.credit);
  }, 0);

  useEffect(() => {
    if (isError) {
      toast.error(`${error}`, {
        toastId: "get-settings-error",
      });
    }
  }, [isError]);

  return (
    <div className="my-md-3">
      <div className="bg-white container-fluid mb-4 p-4 rounded-3">
        <h3>Welcome {user?.displayName} 😃</h3>
        <p>Let GradeTracker help you track your course grades</p>
        {HonorsCalculator(data?.cgpa) && (
          <div className="d-flex gap-2 align-items-center">
            <Trophy size={18} />
            {HonorsCalculator(data?.cgpa)}
          </div>
        )}
      </div>

      <div className="container-fluid mb-4">
        <div className="row gap-4">
          <div className="col p-4 bg-white rounded-3">
            <p className="mb-0 d-flex justify-content-between align-items-center">
              Cumulative GPA
              <span>
                <FaUserGraduate />
              </span>
            </p>
            {isFetching ? (
              <LoadingSpinner />
            ) : isError ? (
              "--"
            ) : (
              <p className="fw-bold mb-0">{data?.cgpa}</p>
            )}{" "}
          </div>

          <div className="col p-4 bg-white rounded-3">
            <p className="mb-0 d-flex justify-content-between align-items-center">
              Active Courses
              <span>
                <NotebookPen size={16} />
              </span>
            </p>
            {isFetching ? (
              <LoadingSpinner />
            ) : isError ? (
              "--"
            ) : (
              <p className="fw-bold mb-0">{courseList.length}</p>
            )}
          </div>

          <div className="col p-4 bg-white rounded-3">
            <p className="mb-0 d-flex justify-content-between align-items-center">
              Completed Courses
              <span>
                <CheckCircle2 size={16} />
              </span>
            </p>
            {isFetching ? (
              <LoadingSpinner />
            ) : isError ? (
              "--"
            ) : (
              <p className="fw-bold mb-0">{data?.coursesCompleted}</p>
            )}
          </div>

          <div className="col col-md-3 p-4 bg-white rounded-3">
            <p className="mb-0 d-flex justify-content-between align-items-center">
              Active Course Credits
              <span>
                <Hourglass size={16} />
              </span>
            </p>
            <p className="fw-bold mb-0">{activeCourseCredits}</p>
          </div>

          <div className="col p-4 bg-white rounded-3">
            <p className="mb-0 d-flex justify-content-between align-items-center">
              Completed Course Credits
              <Database />
            </p>
            {isFetching ? (
              <LoadingSpinner />
            ) : isError ? (
              "--"
            ) : (
              <p className="fw-bold mb-0">{data?.courseCreditsCompleted}</p>
            )}{" "}
          </div>

          <div className="col p-4 bg-white rounded-3">
            <p className="mb-0 d-flex justify-content-between align-items-center">
              Remaining Courses
              <FolderArchive />
            </p>
            {isFetching ? (
              <LoadingSpinner />
            ) : isError ? (
              "--"
            ) : (
              <p className="fw-bold mb-0">
                {data?.remainingCourses - courseList.length}
              </p>
            )}{" "}
          </div>
        </div>
      </div>

      <div className="bg-white container-fluid mb-4 p-4 rounded-3">
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Course Overview</h5>
          <Form name="course-overview" className="d-flex gap-5">
            <Form.Group controlId="searchbar">
              <Form.Control
                type="search"
                placeholder="Search course..."
                onChange={(e) => findCourse(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="dropdown-options">
              <Form.Select>
                <option>Active course</option>
                <option>Completed course</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </div>

        <Table bordered striped hover responsive>
          <thead>
            <tr>
              <th>Course</th>
              <th>Credits</th>
              <th>Current GPA</th>
              <th>Max GPA</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {searchList == null ? (
              courseList.map((course) => (
                <CourseOverview
                  key={course.id}
                  course={course}
                  expandCourse={expandCourse}
                  setExpandCourse={setExpandCourse}
                />
              ))
            ) : searchList.length > 0 ? (
              searchList.map((course) => (
                <CourseOverview
                  key={course.id}
                  course={course}
                  expandCourse={expandCourse}
                  setExpandCourse={setExpandCourse}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5}>Not Found</td>
              </tr>
            )}
          </tbody>
        </Table>

        {courseList.length > 5 && (
          <div className="d-flex justify-content-between align-items-center">
            <Button variant="green">Go Back</Button>
            <Button variant="green">Next</Button>
          </div>
        )}
      </div>

      <ActivityFeed />
    </div>
  );
};

export default UserHome;
