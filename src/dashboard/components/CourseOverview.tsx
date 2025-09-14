import Table from "react-bootstrap/Table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Course } from "@/shared/types/course";

const CourseOverview = ({
  course,
  expandCourse,
  setExpandCourse,
}: {
  course: Course;
  expandCourse: string | boolean;
  setExpandCourse: React.Dispatch<React.SetStateAction<string | boolean>>;
}) => {
  return (
    <>
      <tr key={course?.id}>
        <td>{course?.name}</td>
        <td>{course?.credit}</td>
        <td>4.0</td>
        <td>4.0</td>
        <td>
          {expandCourse === course.id ? (
            <ChevronUp
              size={23}
              role="button"
              onClick={() => setExpandCourse(false)}
            />
          ) : (
            <ChevronDown
              size={23}
              role="button"
              onClick={() => setExpandCourse(course.id)}
            />
          )}
        </td>
      </tr>

      {expandCourse === course.id && (
        <tr>
          <td colSpan={5} className="p-3 bg-light">
            <Table bordered size="sm" responsive className="mb-0" striped>
              <thead>
                <tr>
                  <th>Grading Structure</th>
                  <th>Weight</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {course.structure.map((struct) => (
                  <tr>
                    <td>{struct.name}</td>
                    <td>{struct.weight}</td>
                    <td>?/{struct.number}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </td>
        </tr>
      )}
    </>
  );
};

export default CourseOverview;
