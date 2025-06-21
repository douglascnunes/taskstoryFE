import { useContext } from "react";
import { OnboardingContext } from "../../store/onboarding-context";
import styles from "./AreaOfLifeButton.module.css";
import { getColorFromAngle } from "../../util/helpers/keyword.js"; // Certifique-se de ter isso

function AreaOfLifeButton({ children, isSelected, type, colorAngle }) {
  const { updateAreOfLifeChoices } = useContext(OnboardingContext);

  const backgroundColor = getColorFromAngle(colorAngle);

  return (
    <button
      onClick={() => updateAreOfLifeChoices(type, children)}
      className={`${styles.button} ${isSelected ? styles.selected : ''}`}
      style={{ backgroundColor }}
    >
      {children}
    </button>
  );
}

export default AreaOfLifeButton;
