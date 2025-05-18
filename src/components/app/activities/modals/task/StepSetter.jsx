import { useContext, useEffect, useRef, useState } from "react";
import { ModalContext } from "../../../../../store/modal-context/modal-context";
import styles from "./StepSetter.module.css";
import Step from "./Step";
import { AppContext } from "../../../../../store/app-context";
import { useMutation } from "@tanstack/react-query";
import { upsertSteps } from "../../../../../api/task";


function addTaskStepHelper(prevSteps, description) {
  return [...prevSteps, { id: null, description: description, index: prevSteps.length }]
};

function removeTaskStepHelper(prevSteps, index) {
  return prevSteps
    .filter((step) => step.index !== index)
    .map((step, newIndex) => ({
      ...step,
      index: newIndex
    }));
};

export default function StepSetter() {
  const [edition, setEdition] = useState({
    isEditing: false,
    description: "",
  });

  const {
    task,
    setTaskSteps,
    addTaskStep,
    removeTaskStep
  } = useContext(ModalContext);
  const { mode } = useContext(AppContext);
  const { id, steps } = task;
  const containerRef = useRef();

  const { mutate, data, isPending } = useMutation({
    mutationFn: upsertSteps
  })

  useEffect(() => {
    if (data?.steps) {
      setTaskSteps(data.steps);
    }
  }, [data, setTaskSteps]);

  function handleStartEditing() {
    setEdition(prev => ({ ...prev, isEditing: true, }));
  };

  function handleEditionDescription(value) {
    setEdition(prev => ({ ...prev, description: value, }));
  };

  function handleAddStep() {
    if (edition.description.trim() === "") return;
    addTaskStep(edition.description);

    if (mode === 'UPDATE' && id) {
      mutate({ id, steps: addTaskStepHelper(steps, edition.description) });
    };

    setEdition({ description: "", isEditing: false });
  };

  function handleRemoveStep(index) {
    removeTaskStep(index);

    if (mode === 'UPDATE' && id) {
      mutate({ id, steps: removeTaskStepHelper(steps, index) });
    };
  };


  function handleBlur(e) {
    if (!containerRef.current.contains(e.relatedTarget)) {
      setEdition(prev => ({
        ...prev,
        isEditing: false
      }));
    }
  };


  let stepsContent;

  const sortedSteps = [...steps].sort((a, b) => a.index - b.index);

  if (steps && steps.length > 0) {
    stepsContent = (
      sortedSteps.map((step) => (
        <Step
          key={step.index}
          step={step}
          disabled={isPending}
          removeTaskStep={handleRemoveStep}
        />
      ))
    );
  };


  let editContent;

  if (!edition.isEditing) {
    editContent = (
      <div className={styles.noSteps} onClick={handleStartEditing}>
        <p>Adicione Passos em sua Tarefa</p>
      </div>
    );
  };

  if (edition.isEditing) {
    editContent = (
      <div
        className={styles.stepsEditingContainer}
        tabIndex={-1}
        onBlur={handleBlur}
        ref={containerRef}
      >
        <input
          type="text"
          placeholder="Escreva o passo aqui"
          className={styles.stepInput}
          value={edition.description}
          onChange={(e) => handleEditionDescription(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddStep();
            }
          }}
          autoFocus
        />
        <button
          className={styles.addStepButton}
          onClick={handleAddStep}>
          Adicionar
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.label}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99" />
        </svg>
        <label htmlFor="description">Passos</label>
      </div>
      <div className={styles.stepsContainer}>
        {stepsContent}
        {editContent}
      </div>
    </>
  );
};