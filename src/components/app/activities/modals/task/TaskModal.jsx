import { useContext, useImperativeHandle } from "react";
import ImportDifficulPicker from "../ImportDifficulPicker";
import PriorityView from "../PriorityView";
import modalStyles from "../Modal.module.css";
import KeywordsSetter from "../KeywordsSetter";
import { ModalContext } from "../../../../../store/modal-context/modal-context";
import Description from "../Description";
import Title from "../Title";
import { useMutation } from "@tanstack/react-query";
import { createTaskInstance, createTask, updateTask, updateTaskInstance, upsertSteps } from "../../../../../api/task";
import DateSetter from "../DateSetter";
import { queryClient } from "../../../../../api/queryClient";
import { isTaskTimingValid, preProcessTask } from "../../../../../util/api-helpers/task";
import StepSetter from "./StepSetter";
import CondictionTag from "../CondictionTag";
import { cleanObject } from "../../../../../util/api-helpers/activity"



export default function TaskModal({ ref }) {
  const {
    id,
    title, setTitle,
    description, setDescription,
    importance,
    difficulty,
    keywords,
    task,
    isActivityChange, isInstanceChange,
    reset,
  } = useContext(ModalContext);

  const { mutate: mutateCreateTask } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries(['activities', 'overview']);
    }
  });

  const { mutate: mutateUpdateTask } = useMutation({
    mutationFn: updateTask,
    onSuccess: () => queryClient.invalidateQueries(['activities', 'overview']),
  });

  const { mutate: mutateUpsertSteps } = useMutation({
    mutationFn: upsertSteps,
    onSuccess: () => queryClient.invalidateQueries(['activities']),
  });

  const { mutate: createInstance } = useMutation({
    mutationFn: createTaskInstance,
    onSuccess: () => queryClient.invalidateQueries(['activities']),
  });

  const { mutate: updateInstance } = useMutation({
    mutationFn: updateTaskInstance,
    onSuccess: () => queryClient.invalidateQueries(['activities']),
  });

  useImperativeHandle(ref, () => {
    return {
      create() {
        const [createdAt, cleanedTask, keywordsId] = preProcessTask(task, keywords);

        if ((title && importance && difficulty && keywords.length > 0 && isTaskTimingValid(task))) {
          mutateCreateTask({ activity: { title, description, importance, difficulty, keywords: keywordsId, createdAt, ...cleanedTask } });
        };
        reset();
      },
      update() {
        if (!task.instance.id && isInstanceChange) {
          createInstance({ taskId: task.id, instance: cleanObject(task.instance) });
        }
        else if (isInstanceChange === true) {
          updateInstance({ taskId: task.id, instance: cleanObject(task.instance), instanceId: task.instance.id });
        };

        const [createdAt, cleanedTask, keywordsId] = preProcessTask(task, keywords);

        if (isActivityChange && id &&
          (title !== "" || description !== "" || importance || difficulty || keywords.length > 0 || cleanedTask)
          && isTaskTimingValid(task)) {
          mutateUpdateTask({ activity: { id, title, description, importance, difficulty, keywords: keywordsId, createdAt, ...cleanedTask } });
          mutateUpsertSteps({ id: task.id, steps: task.steps });
        }

        reset();
      },
    }
  }, [id, title, description, importance, difficulty, keywords,
    task.endPeriod, task.frequenceIntervalDays, task.frequenceWeeklyDays, task.id, task.startPeriod, task.steps,
    task.instance.completedOn, task.instance.finalDate, task.instance.id, task.instance.status, task.instance.stepCompletionStatus,
    isActivityChange, isInstanceChange]);


  return (
    <>
      <div className={modalStyles.header}>
        <Title
          type="text"
          name="title"
          placeholder="Título"
          value={title}
          setFunction={setTitle}
        />
        <div className={modalStyles.information}>
          <div className={modalStyles.modalType}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
            </svg>
            <p>Tarefa</p>
          </div>
          <CondictionTag />
        </div>
      </div>
      <div className={modalStyles.optionMenu}>
        <ImportDifficulPicker />
        <PriorityView />
        <DateSetter />
      </div>
      <Description
        name="description"
        id="description"
        placeholder="Escreva aqui a descrição da sua Tarefa"
        value={description}
        setFunction={setDescription}
      />
      <StepSetter />
      <KeywordsSetter />
    </>
  );
};