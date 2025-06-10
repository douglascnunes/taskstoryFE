import { useContext } from "react";
import { AppContext } from "../../../../../store/app-context";
import styles from "./Step.module.css";
import { ModalContext } from "../../../../../store/modal-context/modal-context";



export default function Step({ step, removeTaskStep }) {
  const { mode } = useContext(AppContext);
  const { task, moveTaskStepUp, moveTaskStepDown, toggleStepCompletion, setTaskStepDescription } = useContext(ModalContext);

  const isChecked = task.instance.stepCompletionStatus.includes(step.id);

  const handleToggleStep = () => {
    toggleStepCompletion(step.id);
  };

  const handleMoveStep = (direction) => {
    if (direction === 'up') {
      moveTaskStepUp(step.index);
    } else if (direction === 'down') {
      moveTaskStepDown(step.index);
    }
  };

  function handleDescriptionChange(value) {
    if (!step.id) setTaskStepDescription('index', step.index, value);
    else setTaskStepDescription('id', step.id, value);
  };

  return (
    <div className={styles.stepContainer}>
      <input
        type="checkbox"
        disabled={mode === 'CREATE' || !step.id}
        checked={isChecked}
        onChange={handleToggleStep}
      />
      <input
        type="text"
        className={styles.description}
        value={step.description}
        onChange={(e) => handleDescriptionChange(e.target.value)}
        placeholder="Descrição do passo..."
      />

      <div className={styles.actions}>
        <button className={styles.removeButton} onClick={() => handleMoveStep('up')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
          </svg>
        </button>
        <button className={styles.removeButton} onClick={() => handleMoveStep('down')} title="Mover para baixo" >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
          </svg>
        </button>
        <button className={styles.removeButton} onClick={() => removeTaskStep(step.index, step.id)} title="Remover"       >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
    </div>
  )
};