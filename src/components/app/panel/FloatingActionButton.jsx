import { useContext, useState } from "react";
import styles from "./FloatingActionButton.module.css";
import { Link } from "react-router-dom";
import { AppContext } from "../../../store/app-context";
import { ACITIVITIES_MENU } from "../../../util/enum";
import { ModalContext } from "../../../store/modal-context";


export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal, setMode } = useContext(AppContext);
  const { setType } = useContext(ModalContext);

  function toggleMenu() {
    setIsOpen(!isOpen);
  };

  function handleChoice(value) {
    setIsOpen(!isOpen);
    setMode("create");
    setType(value)
    openModal();
  }

  return (
    <div className={styles.fabContainer}>
      {isOpen && (
        <ul className={styles.menu}>
          {ACITIVITIES_MENU.map((item) => (
            <Link
              key={item[0]}
              to={`?type=${item[1]}`}
              onClick={() => handleChoice(item[1])}
            >
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
