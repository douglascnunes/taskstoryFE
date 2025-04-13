import { ACITIVITIES_MENU } from "../../../../../util/enum";

// const ACITIVITIES_MENU = ACITIVITIES_MENU.pop(-1);

export default function SpecializationMenu({ onSelect }) {
  return (
    <div>
      <h3>Especializar Atividade</h3>
      <div>
        {ACITIVITIES_MENU.map((item) => {(
          <button key={item[0]} onClick={() => onSelect(item[1])}>
            {item[0]}
          </button>
        )}
      )}
      </div>
    </div>
  );
};