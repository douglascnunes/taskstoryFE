import { useContext, useState } from "react";
import styles from "./FloatingActionButton.module.css";
import { Link } from "react-router-dom";
import { AppContext } from "../../../store/app-context";
import { ACITIVITIES_MENU } from "../../../util/enum";


export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useContext(AppContext);

  function toggleMenu() {
    setIsOpen(!isOpen);
  };

  function handleChoice() {
    setIsOpen(!isOpen);
    openModal();
  }

  return (
    <div className={styles.fabContainer}>
      {isOpen && (
        <ul className={styles.menu}>
          {ACITIVITIES_MENU.map((item) => (
            <Link to={`?mode=${item[1]}`} key={item[0]} onClick={handleChoice}>
              <li key={item[0]} className={styles.menuItem}>
                {item[0]}
              </li>
            </Link>
          ))}
        </ul>
      )}
      <button className={styles.fab} onClick={toggleMenu}>
        +
      </button>
    </div>
  );
};
