import { useContext, useState } from "react";
import { fetchAreasOfLife, fetchQuestions } from "../api/onboarding";
import queryClient from "../api/queryClient";
import OnboardingAccountType from "../components/onboarding/OnboardingAccountType";
import OnboardingContextProvider, { OnboardingContext } from "../store/onboarding-context";
import OnboardingQuestion from "../components/onboarding/OnboardingQuestions";
import OnboardingAreaOfLife from "../components/onboarding/OnboardingAreaOfLifes";
import { useQuery } from "@tanstack/react-query";


function OnboardingPage() {
  const { answers } = useContext(OnboardingContext)
  const [step, setSteps] = useState(0);
  const [advice, setAdvice] = useState();

  // const { data: questions } = useQuery({
  //   queryKey: ['questions'],
  //   queryFn: ({ signal }) => fetchQuestions({ signal })
  // });

  function handleButtonToNext() {
    setSteps(prevStep => prevStep + 1);

    // if (answers.length === questions.length) {
    //   setSteps(prevStep => prevStep + 1);
    // }
    // else {
    //   setAdvice(`Faltam ${answers.length - questions.length} perguntas a serem respondidas.`);
    // }
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
        <div>
          {/* {advice && <p>{advice}</p>} */}
          <button
            onClick={handleButtonToPrevious} disabled={step === 0}>
            Retorna
          </button>
          <button onClick={handleButtonToNext} disabled={step === 2}>
            Próximo
          </button>
        </div>
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
