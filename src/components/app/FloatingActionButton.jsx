import { useState } from "react";
import styles from "./FloatingActionButton.module.css";
import { Link } from "react-router-dom";

const ACITIVITIES = [
  ["Activity", "/activities/create"],
  ["Task", "/tasks/create"],
  // ["Project", "/projects/create"],
  ["Habit", "/habits/create"],
  // ["Goal", "/goals/create"],
  // ["Planning", "/planning/create"],
];


export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.fabContainer}>
      {isOpen && (
        <ul className={styles.menu}>
          {ACITIVITIES.map((item) => (
            <Link to={item[1]} key={item[0]}>
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
