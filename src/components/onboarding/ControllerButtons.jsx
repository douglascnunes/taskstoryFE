import { useContext, useState } from "react";
import { OnboardingContext } from "../../store/onboarding-context";
import { useMutation, useQuery } from "@tanstack/react-query";
import OnboardingModal from "./OnboardingModal";
import { onboarding } from "../../api/onboarding";
import { useNavigate } from "react-router-dom";
import style from './AccountTypeButton.module.css';

function ControllerButtons({ toPrevious, toNext, step }) {
  const { answers, accountType, areaOfLife } = useContext(OnboardingContext);
  const [advice, setAdvice] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { data: questions } = useQuery({
    queryKey: ['questions'],
    queryFn: ({ signal }) => fetchQuestions({ signal })
  });

  const { mutate } = useMutation({
    mutationFn: onboarding,
    onSuccess: () => {
      localStorage.setItem('procrastinationType', accountType);
      navigate('/app');
    }
  })

  const questionsLeft = questions.length - answers.length;

  function handlePreviousClick() {
    toPrevious();
  }

  const handleNextClick = () => {
    switch (step) {
      case 0:
        if (questionsLeft === 0) {
          toNext();
          setAdvice(["", -1]);
        } else {
          setAdvice([`Faltam ${questionsLeft} perguntas a serem respondidas.`, 0]);
        }
        break;
      case 1:
        if (accountType !== null) {
          toNext();
          setAdvice(["", -1]);
        } else {
          setAdvice(["Selecione um tipo de procrastinação.", 1]);
        }
        break;
      case 2:
        if (areaOfLife.desirable.length === 3 && areaOfLife.mostPracticed.length === 3) {
          setIsModalOpen(true);
          setAdvice(["", -1]);
        } else {
          setAdvice(["Selecione 3 Áreas da vida mais praticadas e 3 que deseja praticar mais.", 2]);
        }
        break;
      default:
        break;
    }
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    const { desirable, mostPracticed } = areaOfLife;
    mutate({ accountType, desirable, mostPracticed });
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={style.accountBtn}>
      {advice[1] === step && <p>{advice[0]}</p>}
      <button
        onClick={handlePreviousClick} disabled={step === 0}>
        Retornar
      </button>
      <button onClick={handleNextClick} >
        {step === 2 ? 'Finalizar' : 'Próximo'}
      </button>
      <OnboardingModal isOpen={isModalOpen} onConfirm={handleConfirm} onClose={handleClose} />
    </div>
  );
};

export default ControllerButtons;