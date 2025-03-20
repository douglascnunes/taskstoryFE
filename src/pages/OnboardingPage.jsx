import { useState } from "react";


import OnboardingQuestion from "../components/OnboardingQuestions";
import { fetchQuestions } from "../api/onboarding";
import queryClient from "../api/queryClient";


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

  if (onboardingData.step === 0) {
    return (
      <OnboardingQuestion onSelect={onAnswer} />
    )
  }

  return (<h1>ONBOARD</h1>)
}

export default OnboardingPage;


export function loader() {
  return queryClient.fetchQuery({
    queryKey: ['questions'],
    queryFn: ({ signal }) => fetchQuestions({ signal })
  });
};