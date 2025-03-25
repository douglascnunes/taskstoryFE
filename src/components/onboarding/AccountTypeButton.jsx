import { useContext } from "react";
import { OnboardingContext } from "../../store/onboarding-context";


function AccountTypeButton({ children, account }) {
  const { accountType, updateAccountType } = useContext(OnboardingContext);

  return (
    <button
      onClick={() => updateAccountType(account)}
      className={accountType === account ? 'active' : ''}
    >
      {children}
    </button>
  )
};

export default AccountTypeButton;