import { useContext } from "react";
import { IMPORTANCE_VALUES, DIFFICULTY_VALUES } from "../../../../util/enum";
import styles from "./ImpDiffPicker.module.css";
import { ModalContext } from "../../../../store/modal-context";

export default function ImpDiffPicker() {
  const {
    importance, setImportance,
    difficulty, setDifficulty,
   } = useContext(ModalContext);

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="importance">Importância</label>
        <select
          id="importance"
          value={importance}
          onChange={(e) => setImportance(e.target.value)}
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
          onChange={(e) => setDifficulty(e.target.value)}
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