import { useContext } from "react";
import { OnboardingContext } from "../../store/onboarding-context";


function AreaOfLifeButton({ children, colors, isSelected, type }) {
  const { updateAreOfLifeChoices } = useContext(OnboardingContext);

  const styleButton = {
    backgroundColor: isSelected ? colors[1] : colors[2],
    outline: isSelected ? 'solid 0.2rem #1a1a1a ' : '',
  }


  return (
    <button
      onClick={() => updateAreOfLifeChoices(type, children)}
      style={styleButton}
    >
      {children}
    </button>
  )
};

export default AreaOfLifeButton;