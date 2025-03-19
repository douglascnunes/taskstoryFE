import { useLoaderData } from "react-router-dom";
import Question from "./Question";


function OnboardingQuestion({ onSelect }) {
  const data = useLoaderData();


  const questions = data;

  return (
    <div className="container">
      {questions.map(q => {
        const idx = questions.indexOf(q);
        return <Question key={idx} idx={idx} question={q} onSelect={onSelect} />
      }
      )}
      <button>Próximo</button>
    </div>
  )
}

export default OnboardingQuestion;