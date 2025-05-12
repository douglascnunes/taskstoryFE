import { useContext, useState } from "react";
import styles from "./FloatingActionButton.module.css";
import { AppContext } from "../../../store/app-context";
import { ACITIVITIES_MENU } from "../../../util/enum";


export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useContext(AppContext);

  function toggleMenu() {
    setIsOpen(!isOpen);
  };

  function handleChoice(value) {
    setIsOpen(!isOpen);
    openModal('CREATE', String(value).toUpperCase());
  };

  return (
    <div className={styles.fabContainer}>
      {isOpen && (
        <ul className={styles.menu}>
          {ACITIVITIES_MENU.map((item) => (
            <li
              key={item[0]}
              className={styles.menuItem}
              onClick={() => handleChoice(item[1])}
            >
              {item[0]}
            </li>
          ))}
        </ul>
      )}
      <button className={styles.fab} onClick={toggleMenu}>
        +
      </button>
    </div>
  );
};
