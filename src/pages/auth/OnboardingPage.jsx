import { useState } from "react";
import { fetchAreasOfLife, fetchQuestions } from "../../api/onboarding";
import { queryClient } from "../../api/queryClient";
import OnboardingAccountType from "../../components/onboarding/OnboardingAccountType";
import OnboardingContextProvider from "../../store/onboarding-context";
import OnboardingQuestion from "../../components/onboarding/OnboardingQuestions";
import OnboardingAreaOfLife from "../../components/onboarding/OnboardingAreaOfLifes";
import ControllerButtons from "../../components/onboarding/ControllerButtons";


function OnboardingPage() {
  const [step, setSteps] = useState(0);

  function handleButtonToNext() {
    setSteps(prevStep => prevStep + 1);
  };

  function handleButtonToPrevious() {
    setSteps(prevStep => prevStep - 1);
  };


  let content;

  if (step === 0) {
    content = <OnboardingQuestion />
  }
  else if (step === 1) {
    content = <OnboardingAccountType />
  }
  else {
    content = <OnboardingAreaOfLife />
  }

  return (
    <div>
      <OnboardingContextProvider>
        {content}
        <ControllerButtons toPrevious={handleButtonToPrevious} toNext={handleButtonToNext} step={step} />
      </OnboardingContextProvider>

    </div>
  )
}

export default OnboardingPage;


export async function loader() {
  const questionsPromise = queryClient.fetchQuery({
    queryKey: ['questions'],
    queryFn: ({ signal }) => fetchQuestions({ signal })
  });

  const areasOfLifePromise = queryClient.fetchQuery({
    queryKey: ['areasoflife'],
    queryFn: ({ signal }) => fetchAreasOfLife({ signal })
  });

  const [questions, areasOfLife] = await Promise.all([
    questionsPromise,
    areasOfLifePromise,
  ]);

  return { questions, areasOfLife };
}
