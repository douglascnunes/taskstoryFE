import { IMPORTANCE_NAME, DIFFICULTY_NAME, PRIORITY_NAME } from "../../../../../util/enum";


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
    <div>
      {priority && (
        <span className={`priority-tag ${priority[0].toLowerCase()}`}>
          {PRIORITY_NAME[priority[0]][0]}
        </span>
      )}
      {!priority && (
        <span className="priority-tag not-defined">Sem prioridade</span>
      )}
    </div>
  );




};
