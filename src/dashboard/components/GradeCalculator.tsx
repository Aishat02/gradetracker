import { useContext } from "react";
import { DataContext } from "@/shared/context/DataFlow";
import { Course, Structure, Grade } from "@/shared/types/course";

interface GradeCalculatorProps {
  course: Course;
  scenarioGrades?: {
    [structureName: string]: string[];
  };
}

const GradeCalculator = ({ course, scenarioGrades }: GradeCalculatorProps) => {
  const { gradeEntries, gradeFormat, system } = useContext(DataContext);

  if (!course) return null;

  const calculate = (course: Course) => {
    const grades = gradeEntries[course.name] || {};
    let totalEarned = 0;
    let totalRemaining = 0;

    course.structure.forEach((structure: Structure) => {
      const avgWeight = Number(structure.weight) / Number(structure.number);
      const entries = grades[structure.name] || [];
      const scenarioEntries = scenarioGrades?.[structure.name] || [];

      let gradedWeight = 0;
      let earned = 0;

      for (let i = 0; i < Number(structure.number); i++) {
        const score = entries[i] || scenarioEntries[i];
        if (score) {
          const parsed = parseFloat(String(score));
          if (!isNaN(parsed)) {
            earned += parsed;
            gradedWeight += avgWeight;
          }
        }
      }

      totalEarned += earned;
      totalRemaining += Number(structure.weight) - gradedWeight;
    });

    const maxAchievable = totalEarned + totalRemaining;

    const gradingSystem = (value: number) => {
      const grade = gradeFormat.find(
        (range) => value >= range.min && value <= range.max
      );
      return grade?.[system as keyof Grade];
    };

    return {
      current: totalEarned.toFixed(2),
      max: maxAchievable.toFixed(2),
      scale: [gradingSystem(totalEarned), gradingSystem(maxAchievable)],
    };
  };

  const result = calculate(course);
  return (
    <div className="mt-3 border px-4 py-3 rounded-2">
      <div>
        Current Grade: {result.current} {result.scale[0]}
      </div>
      <div>
        Max Possible Grade: {result.max} {result.scale[1]}
      </div>
    </div>
  );
};

export default GradeCalculator;
