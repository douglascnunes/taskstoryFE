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
import { ACTIVITY_TYPE } from "../../../../../util/enum";
import TrashButton from "./TrashButton";



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
    onSuccess: () => queryClient.invalidateQueries(['activities', 'overview'])
  });

  const { mutate: mutateUpdateTask } = useMutation({
    mutationFn: updateTask,
    onSuccess: () => queryClient.invalidateQueries(['activities', 'overview']),
  });

  const { mutate: mutateUpsertSteps } = useMutation({
    mutationFn: upsertSteps,
    onSuccess: () => queryClient.invalidateQueries(['activities', 'overview']),
  });

  const { mutate: createInstance } = useMutation({
    mutationFn: createTaskInstance,
    onSuccess: () => queryClient.invalidateQueries(['activities', 'overview']),
  });

  const { mutate: updateInstance } = useMutation({
    mutationFn: updateTaskInstance,
    onSuccess: () => queryClient.invalidateQueries(['activities', 'overview']),
  });

  useImperativeHandle(ref, () => {
    return {
      create() {
        console.log('task-before', task)

        const [createdAt, keywordsId] = preProcessTask(task, keywords);
        console.log('task-after', task)

        if ((title && importance && difficulty && keywords.length > 0 && isTaskTimingValid(task))) {
          mutateCreateTask({ activity: { title, description, importance, difficulty, keywords: keywordsId, createdAt, ...task } });
        };
        reset();
      },
      update() {
        console.log('update()')
        if (!task.instance.id && isInstanceChange) {
          console.log('create-instance:')
          createInstance({ taskId: task.id, instance: cleanObject(task.instance) });
        }
        else if (isInstanceChange === true) {
          updateInstance({ taskId: task.id, instance: cleanObject(task.instance), instanceId: task.instance.id });
        };
        console.log('task-before', task)

        const [createdAt, keywordsId] = preProcessTask(task, keywords);
        if (isActivityChange && id &&
          (title || description || importance || difficulty || (keywords && keywords.length > 0) || task)
          && isTaskTimingValid(task)) {
          console.log('update-TASK:')
          console.log('task-after', task)
          mutateUpdateTask({ activity: { id, title, description, importance, difficulty, keywords: keywordsId, createdAt, ...task } });
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
          value={title ?? ""}
          setFunction={setTitle}
        />
        <TrashButton task={task} />
        <div className={modalStyles.information}>
          <div className={modalStyles.modalType}>
            {ACTIVITY_TYPE['TASK'].icon}
            <p>{ACTIVITY_TYPE['TASK'].label}</p>
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
        value={description ?? ""}
        setFunction={setDescription}
      />
      <StepSetter />
      <KeywordsSetter />
    </>
  );
};