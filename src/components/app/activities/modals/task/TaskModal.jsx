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

// initialDate
// finalDate
// frequenceIntervalDays
// frequenceWeeklyDays
// steps

function cleanTask(task) {
  const cleanedTask = {};
  for (const [key, value] of Object.entries(task)) {
    if (value !== null && value !== undefined && value !== "" && value.length > 0 ) {
      cleanedTask[key] = value;
    }
  }
  return cleanedTask;
};

function isTaskTimingValid(task) {
  const hasSomeTiming = task.endPeriod || task.frequenceIntervalDays || task.frequenceWeeklyDays;
  const isNotMixingFrequencies = (!!task.frequenceIntervalDays === !!task.frequenceWeeklyDays);
  return hasSomeTiming && isNotMixingFrequencies;
};



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
        const cleanedTask = cleanTask(task);
        const keywordsId = keywords.map(k => k.id);

        if (id &&
          (title !== "" || description !== "" || importance || difficulty || keywords.length > 0)
          && isTaskTimingValid(task)) {
          mutate({ task: { id, title, description, importance, difficulty, keywords: keywordsId, ...cleanedTask } });
        }

        else if ((title !== "" || importance || difficulty || keywords.length > 0)
        ) {
          mutate({ task: { title, description, importance, difficulty, keywords: keywordsId, ...cleanedTask } });
        };

        reset();
      },
    }
  }, [id, title, description, importance, difficulty, keywords, task]);


  return (
    <>
      <div>
        <Title
          type="text"
          name="title"
          placeholder="Título"
          value={title}
          setFunction={setTitle}
        />
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
      <KeywordsSetter />
    </>
  );
};