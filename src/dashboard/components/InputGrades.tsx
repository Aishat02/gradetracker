import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { DataContext } from "@/shared/context/DataFlow";
import { GrPrevious as Prev, GrNext as Next } from "react-icons/gr";
import { FaFileArchive as SaveFile } from "react-icons/fa";
import GradeCalculator from "./GradeCalculator";
import { GradeEntries, Course } from "@/shared/types/course";
import Table from "react-bootstrap/Table";

const InputGrades = () => {
  const { courseList, gradeEntries, setGradeEntries } = useContext(DataContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [selectedOption, setSelectedOption] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectedCourse: Course | undefined = courseList?.find(
    (course) => course.name === selectedOption
  );

  const handleNext = () => {
    if (selectedCourse && currentIndex < selectedCourse.structure.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const saveUserGrades = (data: GradeEntries) => {
    console.log("Form data", data);
  };
  return (
    <div className=" my-md-3 bg-white container-fluid mb-4 p-4 rounded-3">
      <Form onSubmit={handleSubmit(saveUserGrades)}>
        <Form.Select
          aria-label="default"
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            setCurrentIndex(0);
          }}
        >
          <option>Select a course</option>
          {courseList?.map((course) => (
            <option key={course.id} value={course.name}>
              {course.name}
            </option>
          ))}
        </Form.Select>

        {selectedCourse && (
          <div className="my-4 row align-items-center border p-3 rounded-3 bg-whitesmoke">
            <div className="col-5 d-flex flex-column align-items-start">
              <h3>{selectedCourse.name}</h3>

              {selectedCourse.structure.map((structure, index) => {
                const last = index === selectedCourse.structure.length - 1;
                return (
                  <div
                    key={structure.name}
                    className="d-flex flex-column position-relative align-items-center"
                  >
                    <div
                      className={`rounded-circle dot border border-dark ${
                        currentIndex === index ? "bg-green" : ""
                      }`}
                    >
                      <Link
                        to=""
                        className="text-decoration-none position-absolute ps-4"
                      >
                        {structure.name}
                      </Link>
                    </div>
                    {!last && <div className="bar bg-dark"></div>}
                  </div>
                );
              })}
            </div>

            <div className="col">
              {selectedCourse.structure.length > 0 && (
                <>
                  {(() => {
                    const structure = selectedCourse.structure[currentIndex];
                    return (
                      <Table
                        striped
                        bordered
                        hover
                        key={structure.name}
                        className=" my-3"
                      >
                        <thead>
                          <tr>
                            <th>{structure.name}</th>
                            <th className="w-25">Grade % Contribution</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from(
                            { length: Number(structure.number) },
                            (_, index) => (
                              <tr key={index}>
                                <td>
                                  <Form.Control
                                    type="text"
                                    value={`${structure.name} ${index + 1}`}
                                    readOnly
                                  />
                                </td>
                                <td>
                                  <Controller
                                    control={control}
                                    name={`${structure.name}_${index + 1}.grades`}
                                    rules={{
                                      min: {
                                        value: 0,
                                        message: "Min Grade: 0",
                                      },
                                      max: {
                                        value:
                                          Number(structure.weight) /
                                          Number(structure.number),
                                        message: `Max Grade: ${Number(structure.weight) / Number(structure.number)}`,
                                      },
                                      validate: (value) =>
                                        !isNaN(value) || "Enter a valid number",
                                    }}
                                    render={({ field }) => (
                                      <Form.Control
                                        {...field}
                                        type="number"
                                        min={0}
                                        max={
                                          Number(structure.weight) /
                                          Number(structure.number)
                                        }
                                        value={
                                          gradeEntries[selectedCourse.name]?.[
                                            structure.name
                                          ]?.[index] || ""
                                        }
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          field.onChange(val);

                                          setGradeEntries((prev) => {
                                            const courseGrades =
                                              prev[selectedCourse.name] || {};
                                            const structureGrades =
                                              courseGrades[structure.name] ||
                                              [];
                                            const updatedStructureGrades = [
                                              ...structureGrades,
                                            ];
                                            updatedStructureGrades[index] = val;

                                            return {
                                              ...prev,
                                              [selectedCourse.name]: {
                                                ...courseGrades,
                                                [structure.name]:
                                                  updatedStructureGrades,
                                              },
                                            };
                                          });
                                        }}
                                      />
                                    )}
                                  />
                                  {errors?.[
                                    `${structure.name}_${index + 1}.grades`
                                  ] && (
                                    <Form.Text className="text-danger">
                                      {
                                        errors?.[
                                          `$
                                          {structure.name}_${index + 1}.grades`
                                        ]?.message as String
                                      }
                                    </Form.Text>
                                  )}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </Table>
                    );
                  })()}
                </>
              )}

              <div className="d-flex justify-content-between">
                {currentIndex > 0 && (
                  <Button type="button" variant="dark" onClick={handlePrev}>
                    <Prev />
                  </Button>
                )}
                {selectedCourse &&
                  currentIndex !== selectedCourse.structure.length - 1 && (
                    <Button
                      type="button"
                      variant="dark"
                      onClick={handleNext}
                      className="ms-auto"
                    >
                      <Next />
                    </Button>
                  )}
              </div>
              <Button type="submit" variant="dark" className="w-100 my-2">
                <SaveFile />
                Save{" "}
              </Button>
            </div>
            <GradeCalculator course={selectedCourse} />
          </div>
        )}
      </Form>
    </div>
  );
};

export default InputGrades;
