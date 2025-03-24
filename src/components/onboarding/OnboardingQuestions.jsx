import Question from "./Question";
import { fetchQuestions } from "../../api/onboarding";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { OnboardingContext } from "../../store/onboarding-context";


function OnboardingQuestion() {
  const { answers } = useContext(OnboardingContext);

  const { data: questions } = useQuery({
    queryKey: ['questions'],
    queryFn: ({ signal }) => fetchQuestions({ signal })
  });

  return (
    <div className="container">
      {questions.map(question => {
        const idx = questions.indexOf(question);
        return (
          <Question 
          key={idx} 
          idx={idx} 
          question={question} 
          answer={answers.find(answer => answer[1] === idx)}/>
        )
      }
      )}
    </div>
  )
}

export default OnboardingQuestion;