import Question from "./Question";
import { fetchQuestions } from "../api/onboarding";
import { useQuery } from "@tanstack/react-query";


function OnboardingQuestion({ onSelect }) {

  const { data } = useQuery({
    queryKey: ['questions'],
    queryFn: ({ signal }) => fetchQuestions({ signal })
  });

  console.log(data)

  return (
    <div className="container">
      {data.questions.map(q => {
        const idx = data.questions.indexOf(q);
        return <Question key={idx} idx={idx} question={q} onSelect={onSelect} />
      }
      )}
      <button>Próximo</button>
    </div>
  )
}

export default OnboardingQuestion;