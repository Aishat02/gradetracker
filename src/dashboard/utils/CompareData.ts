import { Structure, CourseWithNoId } from "@/shared/types/course";

export const compareData = (
  previous: CourseWithNoId | null,
  current: CourseWithNoId
) => {
  const messages: string[] = [];

  // Case 1: New course added
  if (!previous && current) {
    messages.push(
      `Added new course "${current.name}" with ${current.credit} credits`
    );
    current.structure.forEach((structure: Structure) => {
      messages.push(
        `Added structure "${structure.name}" (No: ${structure.number}, Weight: ${structure.weight}%)`
      );
    });
    return messages;
  }

  // Case 2: Course removed
  if (previous && !current) {
    messages.push(`Removed course "${previous.name}"`);
    return messages;
  }

  // Case 3: Course name or credit changed
  if (previous?.name !== current?.name) {
    messages.push(
      `Renamed course from "${previous?.name}" to "${current?.name}"`
    );
  }
  if (previous?.credit !== current?.credit) {
    messages.push(
      `Updated course credit from ${previous?.credit} to ${current?.credit}`
    );
  }

  // Case 4: Structure changes
  if (Array.isArray(previous?.structure) && Array.isArray(current?.structure)) {
    const maxLen = Math.max(
      previous.structure.length,
      current.structure.length
    );

    for (let i = 0; i < maxLen; i++) {
      const prevItem = previous.structure[i];
      const currItem = current.structure[i];

      if (!prevItem && currItem) {
        messages.push(
          `Added structure "${currItem.name}" (No: ${currItem.number}, Weight: ${currItem.weight}%)`
        );
      } else if (prevItem && !currItem) {
        messages.push(`Removed structure "${prevItem.name}"`);
      } else if (prevItem && currItem) {
        const prevType = prevItem.name;
        const currType = currItem.name;

        if (prevType !== currType) {
          messages.push(
            `Changed structure type from "${prevType}" to "${currType}"`
          );
        }
        if (prevItem.number !== currItem.number) {
          messages.push(
            `Updated "${currType}" number from ${prevItem.number} → ${currItem.number}`
          );
        }
        if (prevItem.weight !== currItem.weight) {
          messages.push(
            `Updated "${currType}" weight from ${prevItem.weight}% → ${currItem.weight}%`
          );
        }
      }
    }
  }

  return messages;
};
