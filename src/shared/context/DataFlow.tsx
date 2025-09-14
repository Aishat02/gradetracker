import { createContext, useEffect, useState, ReactNode, JSX } from "react";
import {
  Course,
  Structure,
  GradeEntries,
  Grade,
  ScenarioType,
} from "../types/course";

type FirebaseUser = {
  uid: string;
  displayName: string;
  email: string;
};

type UserData = {
  system: string;
  setSystem: React.Dispatch<React.SetStateAction<string>>;
  courseList: Course[];
  setCourseList: React.Dispatch<React.SetStateAction<Course[]>>;
  user: FirebaseUser | null;
  setUser: React.Dispatch<React.SetStateAction<FirebaseUser | null>>;
  gradeFormat: Grade[];
  courseWeight: number;
  setCourseWeight: React.Dispatch<React.SetStateAction<number>>;
  structureAverage: Structure[];
  setStructureAverage: React.Dispatch<React.SetStateAction<Structure[]>>;
  gradeEntries: GradeEntries;
  setGradeEntries: React.Dispatch<React.SetStateAction<GradeEntries>>;
  scenario: ScenarioType;
  setScenario: React.Dispatch<React.SetStateAction<ScenarioType>>;
  customScenarioEntries: GradeEntries;
  setCustomScenarioEntries: React.Dispatch<React.SetStateAction<GradeEntries>>;
};

type DataFlowProp = {
  children: ReactNode;
};

export const DataContext = createContext<UserData>({} as UserData);

const DataFlow = ({ children }: DataFlowProp): JSX.Element => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [system, setSystem] = useState<string>("number");
  const [courseList, setCourseList] = useState<Course[]>([]);

  const gradeFormat: Grade[] = [
    { min: 98, max: 100, letter: "A+", number: 4.0 },
    { min: 93, max: 97, letter: "A", number: 4.0 },
    { min: 90, max: 92, letter: "A-", number: 3.67 },
    { min: 88, max: 89, letter: "B+", number: 3.33 },
    { min: 83, max: 87, letter: "B", number: 3.0 },
    { min: 80, max: 82, letter: "B-", number: 2.67 },
    { min: 78, max: 79, letter: "C+", number: 2.33 },
    { min: 73, max: 77, letter: "C", number: 2.0 },
    { min: 70, max: 72, letter: "C-", number: 1.67 },
    { min: 68, max: 69, letter: "D+", number: 1.33 },
    { min: 63, max: 67, letter: "D", number: 1.0 },
    { min: 60, max: 62, letter: "D-", number: 0.7 },
    { min: 0, max: 59, letter: "F", number: 0.0 },
  ];

  const [courseWeight, setCourseWeight] = useState<number>(10);
  const [structureAverage, setStructureAverage] = useState<Structure[]>([]);
  const [gradeEntries, setGradeEntries] = useState<GradeEntries>(() => {
    const stored = localStorage.getItem("gradeEntries");
    return stored ? JSON.parse(stored) : {};
  });

  const [scenario, setScenario] = useState<ScenarioType>("average");
  const [customScenarioEntries, setCustomScenarioEntries] =
    useState<GradeEntries>({});

  useEffect(() => {
    localStorage.setItem("gradeEntries", JSON.stringify(gradeEntries));
  }, [gradeEntries]);

  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        gradeEntries,
        setGradeEntries,
        courseWeight,
        setCourseWeight,
        structureAverage,
        setStructureAverage,
        system,
        setSystem,
        gradeFormat,
        courseList,
        setCourseList,
        scenario,
        setScenario,
        customScenarioEntries,
        setCustomScenarioEntries,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataFlow;
