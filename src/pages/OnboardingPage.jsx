import { useState } from "react";


import OnboardingQuestion from "../components/OnboardingQuestions";
import { fetchQuestions } from "../api/onboarding";
import queryClient from "../api/queryClient";
import OnboardingAccountType from "../components/OnboardingAccountType";


function OnboardingPage() {
  const [onboardingData, setOnboardingData] = useState({
    step: 0,
    answers: [],
    accountType: null,
    keywords: {
      desirable: [],
      mostPracticed: [],
    }
  });

  function handleButtonToNext() {
    console.log(onboardingData.answers)
    setOnboardingData(prevState => {
      return {
        ...prevState,
        step: prevState.step + 1,
      }
    });
  };


  function onAnswer(type, idx, choice) {
    setOnboardingData(prevState => {
      const updatedAnswers = prevState.answers.map(([t, existingIndex, c]) =>
        existingIndex === idx ? [type, idx, choice] : [t, existingIndex, c]
      );

      // Se não encontrou uma resposta existente, adiciona ao array
      const hasAnswered = prevState.answers.some(([_, existingIndex]) => existingIndex === idx);
      const newAnswers = hasAnswered ? updatedAnswers : [...prevState.answers, [type, idx, choice]];

      return {
        ...prevState,
        answers: newAnswers,
      };
    });
  };

  let content, btnNextDisabled, btnPreviousDisabled;

  if (onboardingData.step === 0) {
    btnNextDisabled = false;
    btnPreviousDisabled = true;
  }
  else if (onboardingData.step === 2) {
    btnNextDisabled = true;
    btnPreviousDisabled = false;
  }
  else {
    btnNextDisabled = false;
    btnPreviousDisabled = false;
  }

  if (onboardingData.step === 0) {
    content = (
      <OnboardingQuestion onSelect={onAnswer} />
    )
  }
  else if (onboardingData.step === 1) {
    content = (
      <OnboardingAccountType answers={onboardingData.answers} />
    )
  }
  else {

  }

  return (
    <div>
      {content}
      <button onClick={handleButtonToNext} disabled={btnNextDisabled}>Próximo</button>
    </div>
  )
}

export default OnboardingPage;


export function loader() {
  return queryClient.fetchQuery({
    queryKey: ['questions'],
    queryFn: ({ signal }) => fetchQuestions({ signal })
  });
};