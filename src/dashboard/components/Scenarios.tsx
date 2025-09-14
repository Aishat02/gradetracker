import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "@/shared/context/DataFlow";
import GradeCalculator from "./GradeCalculator";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface ScenarioGrade {
  [courseName: string]: {
    [structureName: string]: string[];
  };
}

const Scenarios: React.FC = () => {
  const { courseList, gradeEntries } = useContext(DataContext);
  const [scenarioGrades, setScenarioGrades] = useState<ScenarioGrade>({});
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  const handleGradeChange = (
    courseName: string,
    structureName: string,
    index: number,
    value: string
  ) => {
    setScenarioGrades((prev) => ({
      ...prev,
      [courseName]: {
        ...prev[courseName],
        [structureName]: Object.assign(
          [],
          prev[courseName]?.[structureName] || [],
          { [index]: value }
        ),
      },
    }));
  };

  const selectedCourseData = courseList?.find((c) => c.name === selectedCourse);

  const handleSaveScenarios = () => {
    localStorage.setItem(
      "gradetracker_scenarios",
      JSON.stringify(scenarioGrades)
    );
  };

  useEffect(() => {
    const savedScenarios = localStorage.getItem("gradetracker_scenarios");
    if (savedScenarios) {
      setScenarioGrades(JSON.parse(savedScenarios));
    }
  }, []);

  return (
    <div className="bg-white container-fluid mb-4 my-md-3 p-4 rounded-3">
      <h3>Grade Prediction Scenarios</h3>
      <Form>
        <Form.Select
          className="mb-3"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">Select a course</option>
          {courseList?.map((course) => (
            <option key={course.id} value={course.name}>
              {course.name}
            </option>
          ))}
        </Form.Select>

        {selectedCourse &&
          selectedCourseData?.structure.map((structure) => (
            <div key={structure.name} className="card mb-3">
              <div className="card-header">
                <h5>{structure.name}</h5>
                <small>Weight: {structure.weight}%</small>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  {Array.from({ length: Number(structure.number) }).map(
                    (_, index) => {
                      const existingGrade =
                        gradeEntries[selectedCourse]?.[structure.name]?.[index];

                      return (
                        <Form.Group
                          key={index}
                          className="col-md-3"
                          controlId="gradeInput"
                        >
                          <Form.Label>
                            {structure.name} {index + 1}
                          </Form.Label>
                          {existingGrade ? (
                            <Form.Control
                              type="number"
                              value={existingGrade}
                              disabled
                            />
                          ) : (
                            <Form.Control
                              type="number"
                              value={
                                scenarioGrades[selectedCourse]?.[
                                  structure.name
                                ]?.[index] || ""
                              }
                              onChange={(e) =>
                                handleGradeChange(
                                  selectedCourse,
                                  structure.name,
                                  index,
                                  e.target.value
                                )
                              }
                              min={0}
                              max={structure.weight / structure.number}
                            />
                          )}
                        </Form.Group>
                      );
                    }
                  )}
                </div>
                <Button onClick={handleSaveScenarios}>Save Scenarios</Button>
              </div>
            </div>
          ))}

        {selectedCourse && selectedCourseData && (
          <div className="col p-4 border rounded-3">
            <h5>Current Grade Status:</h5>
            <GradeCalculator course={selectedCourseData} />
            <h5 className="mt-3">Projected Grade with Scenarios:</h5>
            <GradeCalculator
              course={selectedCourseData}
              scenarioGrades={scenarioGrades[selectedCourse]}
            />
          </div>
        )}
      </Form>
    </div>
  );
};

export default Scenarios;
