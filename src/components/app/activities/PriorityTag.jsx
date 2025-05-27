import { IMPORTANCE_VALUES, DIFFICULTY_VALUES, PRIORITY } from "../../../util/enum";
import styles from "./PriorityTag.module.css";


export default function PriorityView({ importance, difficulty }) {
  const importanceValue = IMPORTANCE_VALUES[importance]?.[1];
  const difficultyValue = DIFFICULTY_VALUES[difficulty]?.[1];

  let priorityKey = null;
  let priorityLabel = "Sem prioridade";
  let backgroundColor = "#e0e0e0";
  let labelColor = "#333";

  if (importanceValue && difficultyValue) {
    const priorityValue = (importanceValue + difficultyValue) / 2;
    const foundPriority = Object.entries(PRIORITY).find(
      ([, [label, min, max]]) => priorityValue >= min && priorityValue < max
    );

    if (foundPriority) {
      const [key, [label, , , bgColor, lblColor]] = foundPriority;
      priorityKey = key;
      priorityLabel = label;
      backgroundColor = bgColor;
      labelColor = lblColor;
    }
  }

  return (
    <div
      className={styles.container}
      style={{ backgroundColor }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>

      <span style={{ color: labelColor }}>
        {priorityLabel}
      </span>
    </div>
  );
}
