import { useContext, useImperativeHandle } from "react";
import ImportDifficulPicker from "../ImportDifficulPicker";
import PriorityTag from "../PriorityTag";
import modalStyles from "../Modal.module.css";
import KeywordsSetter from "../KeywordsSetter";
import { ModalContext } from "../../../../../store/modal-context";
import Description from "../Description";
import Title from "../Title";
import { useMutation } from "@tanstack/react-query";
import { upsertTask } from "../../../../../api/task";
import DateSetter from "../DateSetter";
import { queryClient } from "../../../../../api/queryClient";
import { cleanTask, isTaskTimingValid } from "../../../../../util/upsert/task";
import StepSetter from "./StepSetter";
import StatusTag from "../StatusTag";

// steps



export default function TaskModal({ ref }) {
  const {
    id,
    title, setTitle,
    description, setDescription,
    importance,
    difficulty,
    keywords,
    task,
    reset,
  } = useContext(ModalContext);


  const { mutate } = useMutation({
    mutationFn: upsertTask,
    onSuccess: () => {
      queryClient.invalidateQueries(['activities', 'overview']);
    }
  });

  useImperativeHandle(ref, () => {
    return {
      upsert() {
        task.startPeriod = task.startPeriod ? new Date(task.startPeriod) : null;
        task.endPeriod = task.endPeriod ? new Date(task.endPeriod) : null;
        const createdAt = new Date();
        const cleanedTask = cleanTask(task);
        const keywordsId = keywords.map(k => k.id);

        if (id &&
          (title !== "" || description !== "" || importance || difficulty || keywords.length > 0)
          && isTaskTimingValid(task)) {
          mutate({ task: { id, title, description, importance, difficulty, keywords: keywordsId, createdAt, ...cleanedTask } });
        }

        else if ((title !== "" || importance || difficulty || keywords.length > 0)
        ) {
          mutate({ task: { title, description, importance, difficulty, keywords: keywordsId, createdAt, ...cleanedTask } });
        };

        reset();
      },
    }
  }, [id, title, description, importance, difficulty, keywords, task]);


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
          <StatusTag />
        </div>
      </div>
      <div className={modalStyles.optionMenu}>
        <ImportDifficulPicker />
        <PriorityTag />
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