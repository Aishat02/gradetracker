import { useState, useContext, useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { X, Plus, Pencil, Trash } from "lucide-react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { DataContext } from "@/shared/context/DataFlow";
import {
  useCreate,
  useRead,
  useUpdate,
  useDelete,
} from "@/features/database/useCRUD";
import { LoadingSpinner } from "./MotionAnimations";
import { compareData } from "../utils/CompareData";
import { postActivity } from "@/features/feed/postActivity";
import { Course, CourseWithNoId } from "@/shared/types/course";

const CourseManagement = () => {
  const { courseList, setCourseList } = useContext(DataContext)!;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [clickedButton, setClickedButton] = useState<"Add" | "Edit">("Add");
  const [editId, setEditId] = useState<string>("");
  const previousData = useRef<CourseWithNoId | null>(null);

  const createCourse = useCreate("course");
  const { data, isLoading, isFetching } = useRead("course");
  const removeCourse = useDelete("course");
  const updateCourse = useUpdate("course", editId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues,
    watch,
  } = useForm<CourseWithNoId>({
    defaultValues: {
      name: "",
      credit: 0,
      structure: [{ name: "Final Exam", number: 1, weight: 20 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "structure",
  });

  const watchedStructure = watch("structure") ?? [];

  const totalWeight = watchedStructure?.reduce(
    (total, item) => total + Number(item.weight || 0),
    0
  );

  const progressBarColor = totalWeight === 100 ? "bg-green" : "bg-danger";

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const modalButton = (
    button: "Add" | "Edit",
    course: Course | null = null
  ) => {
    setClickedButton(button);
    openModal();

    if (button === "Edit" && course) {
      previousData.current = course;
      setEditId(course.id ?? "");
      reset({
        name: course.name,
        credit: course.credit,
        structure: course.structure.map((item) => ({
          name: item.name,
          number: item.number,
          weight: item.weight,
        })),
      });
    } else {
      previousData.current = null;
      reset({
        name: "",
        credit: 0,
        structure: [{ name: "Final Exam", number: 1, weight: 20 }],
      });
    }
  };

  const addCourse = async (data: CourseWithNoId) => {
    const newCourse = {
      name: data.name,
      credit: data.credit,
      structure: data.structure.map((item) => ({
        name: item.name,
        number: item.number,
        weight: item.weight,
      })),
    };

    const changes = compareData(previousData.current ?? null, newCourse);

    if (changes.length > 0) {
      console.log(newCourse.name, "changes:");
      changes.forEach((msg) => console.log(`- ${msg}`));
      await postActivity(newCourse.name, changes);
      clickedButton === "Edit"
        ? updateCourse.mutate(newCourse)
        : createCourse.mutate(newCourse);
    } else {
      toast.info(`Nothing to change for ${newCourse.name}`, {
        toastId: `no-changes`,
      });
    }

    closeModal();
    reset();
  };

  const deleteCourse = async (courseToRemove: Course) => {
    if (
      confirm("Are you sure you want to delete this course?") &&
      courseToRemove.id
    ) {
      removeCourse.mutate(courseToRemove);
      await postActivity(courseToRemove?.name, [
        `Removed course ${courseToRemove.name}`,
      ]);
    }
  };

  useEffect(() => {
    if (!isLoading && data) {
      setCourseList(
        (data as Course[]).sort((a, b) => a.name.localeCompare(b.name))
      );
    }
  }, [data]);

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <div className="my-md-3">
      <div className="bg-white container-fluid mb-4 p-4 rounded-3">
        <h3 className="border-bottom pb-3 mb-4">Courses 😃</h3>
        <p className="text-muted">
          Add, Edit and Delete courses along with their grading structures here.
        </p>

        {courseList?.map((course: Course) => (
          <div
            key={course?.id}
            className="shadow-sm d-flex justify-content-between border flex-row rounded-2 p-3 mb-3"
          >
            <div>
              <h4 className="fw-bold">{course.name}</h4>
              <p className="pb-0">Credits: {course.credit}</p>
            </div>
            <div>
              Grading structures:
              <ul>
                {course.structure.map((item) => (
                  <li key={item.name}>
                    {item.name} - {item.number} - {item.weight}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Button
                variant="transparent"
                onClick={() => modalButton("Edit", course)}
              >
                <Pencil color="blue" size={20} />
              </Button>
              <Button
                variant="transparent"
                onClick={() => deleteCourse(course)}
              >
                <Trash color="red" />
              </Button>
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-center">
          <Button variant="dark" onClick={() => modalButton("Add")}>
            Add Course
          </Button>
        </div>
      </div>

      <Modal show={modalIsOpen} onHide={closeModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            {clickedButton === "Add" ? "Add New Course" : "Edit Course"}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit(addCourse)}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="courseName">
              <Form.Control
                type="text"
                placeholder="Course Code"
                autoFocus
                {...register("name", {
                  required: "Course Code is required",
                  minLength: { value: 3, message: "Min 3 characters" },
                })}
              />
              {errors.name && (
                <Form.Text className="text-danger">
                  {errors.name.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="courseCredit">
              <Form.Control
                type="number"
                placeholder="Credit"
                min={0}
                max={6}
                {...register("credit", { required: true })}
              />
              {errors.credit && (
                <Form.Text className="text-danger">
                  Course Credit is required
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="courseStructure">
              <h5>Grading Structure</h5>
              <Table striped bordered size="sm">
                <thead>
                  <tr>
                    <th>
                      <Form.Label>Name</Form.Label>
                    </th>
                    <th>
                      <Form.Label>No.</Form.Label>
                    </th>
                    <th>
                      <Form.Label>Weight</Form.Label>
                    </th>
                    <th>
                      <Form.Label></Form.Label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field, index) => (
                    <tr key={field.id}>
                      <td>
                        <Form.Control
                          type="text"
                          {...register(`structure.${index}.name`, {
                            required: true,
                          })}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          min={1}
                          max={20}
                          {...register(`structure.${index}.number`, {
                            required: true,
                            valueAsNumber: true,
                          })}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          min={0}
                          max={100}
                          {...register(`structure.${index}.weight`, {
                            required: true,
                            valueAsNumber: true,
                          })}
                        />
                      </td>
                      <td>
                        {index > 0 && (
                          <Button variant="none" onClick={() => remove(index)}>
                            <X size={20} color="red" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="d-flex justify-content-end">
                <Button
                  variant="green"
                  onClick={() => {
                    const last = getValues("structure")?.slice(-1)[0];
                    if (!last?.name || !last?.number || !last?.weight) {
                      toast.error("Fill the current structure first", {
                        toastId: "no-changes",
                      });
                      return;
                    }
                    append({ name: "", number: 0, weight: 0 });
                  }}
                >
                  <Plus size={16} className="me-1" /> Add Structure
                </Button>
              </div>
            </Form.Group>

            <div className="mb-4 bg-light p-3 rounded-2 shadow-sm">
              <div className="d-flex justify-content-between fw-bold">
                <span>Total Weight</span>
                <span>{totalWeight} / 100%</span>
              </div>
              <div className="progress mt-1">
                <div
                  className={`progress-bar ${progressBarColor}`}
                  style={{ width: `${Math.min(totalWeight, 100)}%` }}
                ></div>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer className="justify-content-between">
            <Button variant="dark" onClick={closeModal}>
              Close
            </Button>

            <Button
              type="submit"
              variant="green"
              disabled={totalWeight !== 100}
            >
              Save Course
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default CourseManagement;
