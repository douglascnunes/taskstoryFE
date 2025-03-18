import Question from "./Question";

const questions = [
  ["Quando surge uma nova tarefa, você se planeja, define metas e cria estratégias para executá-la adequadamente?", 0],
  ["Como você classifica o seu planejamento a médio e longo prazo nas áreas pessoal e profissional?", 0],
  ["Ao iniciar um projeto de médio prazo (3 meses) por vontade própria, qual a chance de você finalizá-lo?", 0],
  ["Você costuma refletir sobre seus métodos de gerenciamento de tempo e organização pessoal para buscar melhorias?", 0],
  ["Ao iniciar uma tarefa, você normalmente começa imediatamente ou costuma procrastinar?", 1],
  ["Se você recebe uma tarefa com prazo curto em relação à sua complexidade, você se sente capaz de realizar o melhor possível?", 1],
  ["Com que frequência você cria projetos e define metas para desafiá-lo a alcançar melhores resultados pessoais e/ou profissionais?", 1],
  ["Com que frequência você se sente motivado para realizar tarefas completamente novas?", 1],
]


function OnboardingQuestion({ onSelect }) {


  return (
    <>
      {questions.map(q => {
        const idx = questions.indexOf(q);
        return <Question key={idx} number={idx + 1} question={q} onSelect={onSelect} />
      }
      )}
    </>
  )
}

export default OnboardingQuestion;