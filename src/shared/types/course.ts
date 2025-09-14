export type Structure = {
  name: string;
  number: number;
  weight: number;
};

export type Course = {
  id: string;
  name: string;
  credit: number;
  structure: Structure[];
};

export type CourseWithNoId = Omit<Course, "id">;

export type Grade = {
  min: number;
  max: number;
  letter: string;
  number: number;
};

export type GradeEntries = Record<string, Record<string, (number | string)[]>>;

export type ScenarioType = "best" | "average" | "worst" | "custom";
