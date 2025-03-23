import { useContext } from "react";
import { OnboardingContext } from "../../store/onboarding-context";

function AccountTypeButton({ children, index }) {
  const { accountType, updateAccountType } = useContext(OnboardingContext);

  return (
    <button
      onClick={() => updateAccountType(index)}
      className={accountType === index ? 'active' : ''}
    >
      {children}
    </button>
  )
};

export default AccountTypeButton;