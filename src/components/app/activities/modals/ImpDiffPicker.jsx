import { IMPORTANCE_NAME, DIFFICULTY_NAME } from "../../../../util/enum";


export default function ImpDiffPicker({ importance, difficulty, onSelect }) {


  return (
    <div>
      <div>
        <label htmlFor="importance">Importance:</label>
        <select
          id="importance"
          value={importance}
          onChange={(e) => onSelect('importance', e.target.value)}
        >
          {Object.entries(IMPORTANCE_NAME).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="difficulty">Difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => onSelect('difficulty', e.target.value)}
        >
          {Object.entries(DIFFICULTY_NAME).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};