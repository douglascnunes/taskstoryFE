import { useState } from "react";


import OnboardingQuestion from "../components/OnboardingQuestions";


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

  function onAnswer(type, choice) {
    setOnboardingData(prevState => {
      let { answers } = prevState;
      answers.push([type, choice])
      return {
        ...prevState,
        answers,        
      }
    })
  };

  if (onboardingData.step === 0) {
    return (
      <OnboardingQuestion onSelect={onAnswer} />
    )
  }

  return (<h1>ONBOARD</h1>)
}

export default OnboardingPage;