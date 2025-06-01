import { useContext, useState } from "react";
import styles from "./FloatingActionButton.module.css";
import { AppContext } from "../../../store/app-context";
import { ACTIVITY_TYPE } from "../../../util/enum.jsx";


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

  const visibleItemLimit = 2;

  const limitedEntries = Object.entries(ACTIVITY_TYPE).slice(0, visibleItemLimit);

  return (
    <div className={styles.fabContainer}>
      {isOpen && (
        <ul className={styles.menu}>
          {limitedEntries.map(([key, { label }]) => (
            <li
              key={key}
              className={styles.menuItem}
              onClick={() => handleChoice(key)}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
      <button className={styles.fab} onClick={toggleMenu}>
        +
      </button>
    </div>
  );
}