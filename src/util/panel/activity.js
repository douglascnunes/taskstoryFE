import { DIFFICULTY_VALUES, IMPORTANCE_VALUES, PRIORITY } from "../enum";



export const calcPriority = (activity) => {
  const importanceValue = IMPORTANCE_VALUES[activity.importance]?.[1];
  const difficultyValue = DIFFICULTY_VALUES[activity.difficulty]?.[1];

  if (importanceValue && difficultyValue) {
    const priorityValue = (importanceValue + difficultyValue) / 2;
    const foundPriority = Object.entries(PRIORITY).find(
      ([, [label, min, max]]) => priorityValue >= min && priorityValue < max
    );

    return foundPriority;
  }
}