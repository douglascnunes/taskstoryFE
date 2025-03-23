import { useContext } from "react";
import { OnboardingContext } from "../../store/onboarding-context.jsx";
import AccountTypeButton from "./AccountTypeButton";

const ACCOUNT_NAMES = [
  ['SUPERPROCRASTINATOR', 'Super Procastinador'],
  ['PERFECTIONIST', 'Perfeccionista'],
  ['DISORGANIZED', 'Desorganizado'],
  ['ANTIPROCRASTINATOR', 'Antiprocrastinator']
]

function calculateAverages(responses) {
  let selfRegulationSum = 0;
  let selfEfficacySum = 0;
  let selfRegulationCount = 0;
  let selfEfficacyCount = 0;

  responses.forEach(([category, , response]) => {
    if (category === 0) {
      selfRegulationSum += response;
      selfRegulationCount++;
    } else if (category === 1) {
      selfEfficacySum += response;
      selfEfficacyCount++;
    }
  });
  const selfRegulationAverage = selfRegulationCount > 0 ? selfRegulationSum / selfRegulationCount : 0;
  const selfEfficacyAverage = selfEfficacyCount > 0 ? selfEfficacySum / selfEfficacyCount : 0;

  return {
    selfRegulationAverage,
    selfEfficacyAverage
  };
}

function calculateAccountType(selfRegulationAverage, selfEfficacyAverage) {
  if (selfRegulationAverage < 2.5 && selfEfficacyAverage < 2.5) {
    return 0; // Usuário Procrastinador Sistemático
  } else if (selfRegulationAverage >= 2.5 && selfEfficacyAverage < 2.5) {
    return 1; // Usuário Procrastinador Perfeccionista
  } else if (selfRegulationAverage < 2.5 && selfEfficacyAverage >= 2.5) {
    return 2; // Usuário Procrastinador Acidental
  } else if (selfRegulationAverage >= 2.5 && selfEfficacyAverage >= 2.5) {
    return 3; // Usuário Antiprocrastinador
  }
};


function OnboardingAccountType() {
  const { answers } = useContext(OnboardingContext);

  const { selfRegulationAverage, selfEfficacyAverage } = calculateAverages(answers);
  const accountTypeResult = calculateAccountType(selfRegulationAverage, selfEfficacyAverage)
  let otherAccountTypes = [0, 1, 2, 3]
  otherAccountTypes = otherAccountTypes.filter(e => e !== accountTypeResult)


  return (
    <div>
      <p>Cada tipo de conta no aplicativo oferece uma abordagem personalizada para ajudar o usuário a vencer a procrastinaçãa Serão entregues
        missões especificas que guiamodesenvolvimento da autorregulação e da autoeficácia, focando nas áreas que precisam ser melhoradas.</p>
      <p>Seu tipo de procrastinaçao é Perfeccionista.</p>
      <AccountTypeButton key={accountTypeResult} index={accountTypeResult}>
        {ACCOUNT_NAMES[accountTypeResult][1]}
      </AccountTypeButton>
      <p>Você pode optar por escolher começar com um dos outros tipos de procrastinação.</p>
      {otherAccountTypes.map(type => {
        return (
          <AccountTypeButton key={type} index={type}>
            {ACCOUNT_NAMES[type][1]}
          </AccountTypeButton>
        )
      })}
    </div>
  )
}

export default OnboardingAccountType;