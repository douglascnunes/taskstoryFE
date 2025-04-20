import { IMPORTANCE_VALUES, DIFFICULTY_VALUES } from "../../../../util/enum";
import styles from "./ImpDiffPicker.module.css";

export default function ImpDiffPicker({ importance, difficulty, onChange }) {
  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="importance">Importância</label>
        <select
          id="importance"
          value={importance}
          onChange={(e) => onChange('importance', e.target.value)}
        >
          {Object.entries(IMPORTANCE_VALUES).map(([key, value]) => (
            <option key={key} value={key}>
              {value[0]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="difficulty">Dificuldade</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => onChange('difficulty', e.target.value)}
        >
          {Object.entries(DIFFICULTY_VALUES).map(([key, value]) => (
            <option key={key} value={key}>
              {value[0]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};