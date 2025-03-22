import Question from "./Question";
import { fetchQuestions } from "../api/onboarding";
import { useQuery } from "@tanstack/react-query";


function OnboardingQuestion({ onSelect }) {

  const { data } = useQuery({
    queryKey: ['questions'],
    queryFn: ({ signal }) => fetchQuestions({ signal })
  });

  return (
    <div className="container">
      {data.map(q => {
        const idx = data.indexOf(q);
        return <Question key={idx} idx={idx} question={q} onSelect={onSelect} />
      }
      )}
    </div>
  )
}

export default OnboardingQuestion;