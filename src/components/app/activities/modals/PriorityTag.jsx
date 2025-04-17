import { IMPORTANCE_NAME, DIFFICULTY_NAME, PRIORITY_NAME } from "../../../../util/enum";
import styles from "./PriorityTag.module.css";

export default function PriorityTag({ importance, difficulty }) {
  const importanceValue = IMPORTANCE_NAME[importance]?.[1];
  const difficultyValue = DIFFICULTY_NAME[difficulty]?.[1];

  let priority = null;

  if (importanceValue && difficultyValue) {
    const priorityValue = (importanceValue + difficultyValue) / 2;
    priority = Object.entries(PRIORITY_NAME).find(([key, value]) => {
      return priorityValue >= value[1] && priorityValue < value[2];
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        <h3>Prioridade</h3>
      </div>
      {priority && (
        <div className={`${styles.priorityTagContainer} ${styles[priority[0].toLowerCase()]}`}>
          <span className={styles.priorityTag}>
            {console.log(priority[0].toLowerCase())}
            {PRIORITY_NAME[priority[0]][0]}
          </span>
        </div>
      )}
      {!priority && (
        <span className={`${styles.priorityTag} ${styles["not-defined"]}`}>
          Sem prioridade
        </span>
      )}
    </div>
  );




};
