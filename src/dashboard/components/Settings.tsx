import { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import { DataContext } from "@/shared/context/DataFlow";
import { useForm } from "react-hook-form";
import { PulseEffect } from "./MotionAnimations";
import { useUpdate } from "@/features/database/useCRUD";

interface SettingsData {
  remainingCourses: number;
  coursesCompleted: number;
  courseCreditsCompleted: number;
  cgpa: number;
  gradingSystem: "number" | "letter";
}

const Settings = () => {
  const { setSystem, user } = useContext(DataContext);
  const updateSettings = useUpdate("settings", user?.uid ?? "");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SettingsData>();

  useEffect(() => {
    if (updateSettings.data) {
      reset({
        cgpa: updateSettings.data.cgpa || 0.0,
        coursesCompleted: updateSettings.data.coursesCompleted || 0,
        courseCreditsCompleted: updateSettings.data.courseCreditsCompleted || 0,
        remainingCourses: updateSettings.data.remainingCourses || 40,
        gradingSystem: updateSettings.data.gradingSystem || "number",
      });
    }
  }, [updateSettings.data, reset]);

  return (
    <div className="container mx-auto">
      <Form onSubmit={handleSubmit((data) => updateSettings.mutate(data))}>
        <div className="my-lg-4 p-4 bg-white rounded-3">
          <h3 className="border-bottom pb-3">User Profile</h3>
          <Form.Group controlId="cgpa" className="mb-3">
            <Form.Label>Cumulative GPA</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              autoFocus
              min={0}
              max={4.0}
              {...register("cgpa", {
                required: "Please provide your CGPA",
                min: { value: 0, message: "Minimum is 0" },
                max: { value: 4.0, message: "Maximum is 4.0" },
              })}
            />
            {errors.cgpa && (
              <p className="text-danger mt-2">{errors.cgpa.message}</p>
            )}
          </Form.Group>
          <Form.Group controlId="courses-completed" className="mb-3">
            <Form.Label>Number of courses completed</Form.Label>
            <Form.Control
              type="number"
              min={0}
              max={70}
              {...register("coursesCompleted", {
                required: "Please provide the number of courses completed",
                min: { value: 0, message: "Minimum is 0" },
                max: { value: 70, message: "Maximum is 70" },
              })}
            />{" "}
            {errors.coursesCompleted && (
              <p className="text-danger mt-2">
                {errors.coursesCompleted.message}
              </p>
            )}
          </Form.Group>
          <Form.Group controlId="completed-course-credits" className="mb-3">
            <Form.Label>Number of completed course credits</Form.Label>
            <Form.Control
              type="number"
              min={0}
              max={160}
              {...register("courseCreditsCompleted", {
                required:
                  "Please provide the number of course credits completed",
                min: { value: 0, message: "Minimum is 0" },
                max: { value: 160, message: "Maximum is 160" },
              })}
            />
            {errors.courseCreditsCompleted && (
              <p className="text-danger mt-2">
                {errors.courseCreditsCompleted.message}
              </p>
            )}
          </Form.Group>
          <Form.Group controlId="course-credits" className="mb-3">
            <Form.Label>Number of remaining courses</Form.Label>
            <Form.Control
              type="number"
              min={0}
              max={50}
              {...register("remainingCourses", {
                min: { value: 0, message: "Minimum is 0" },
                max: { value: 50, message: "Maximum is 50" },
              })}
            />{" "}
            {errors.remainingCourses && (
              <p className="text-danger mt-2">
                {errors.remainingCourses.message}
              </p>
            )}
          </Form.Group>{" "}
          <Form.Group controlId="gradingSystem" className="mb-3">
            <Form.Label>Preferred Grading Scale</Form.Label>
            <Form.Check
              type="radio"
              id="Letter"
              label="Letter"
              value="letter"
              {...register("gradingSystem")}
              onChange={() => setSystem("letter")}
            />
            <Form.Check
              type="radio"
              id="Number"
              label="Number"
              value="number"
              {...register("gradingSystem")}
              onChange={() => setSystem("number")}
            />
          </Form.Group>
          <PulseEffect
            type="button"
            state={updateSettings.isPending}
            style=" btn btn-dark"
            onClick={handleSubmit((data) => updateSettings.mutate(data))}
          >
            {updateSettings.isPending ? "Submitting" : "Submit"}
          </PulseEffect>
        </div>

        {/* // Account Profile */}
        <div className=" my-4 p-4 bg-white rounded-3">
          <h3 className="border-bottom pb-3">Account Settings</h3>
          <Form.Label htmlFor="name">Username</Form.Label>
          <Form.Control
            type="text"
            id="name"
            value={user?.displayName || " "}
            readOnly
          />
          <br />
          <Form.Label htmlFor="name">Email address</Form.Label>
          <Form.Control
            type="email"
            id="name"
            value={user?.email || " "}
            readOnly
          />
        </div>
      </Form>
    </div>
  );
};

export default Settings;
