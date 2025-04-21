import { useContext, useImperativeHandle } from "react";
import ImpDiffPicker from "../ImpDiffPicker";
import PriorityTag from "../PriorityTag";
import modalStyles from "../Modal.module.css";
import KeywordsSetter from "../KeywordsSetter";
import { ModalContext } from "../../../../../store/modal-context";
import Description from "../Description";
import Title from "../Title";
import { useMutation } from "@tanstack/react-query";
import { upsertTask } from "../../../../../api/task";

// initialDate
// finalDate
// frequenceIntervalDays
// frequenceWeeklyDays
// steps

export default function TaskModal({ ref }) {
  const {
    id,
    title, setTitle,
    description, setDescription,
    importance,
    difficulty,
    keywords,
    reset,
  } = useContext(ModalContext);


  const { mutate } = useMutation({
    mutationFn: upsertTask
  });

  useImperativeHandle(ref, () => {
    return {
      upsert() {
        if (id && (title !== "" || description !== "" || importance || difficulty || keywords.length > 0)) {
          mutate({ activity: { id, title, description, importance, difficulty, keywords } })
        }
        else if (title !== "" && keywords.length > 0) {
          mutate({ activity: { title, description, importance, difficulty, keywords } })
        }
        reset();
      },
    }
  }, [id, title, description, importance, difficulty, keywords]);


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
        <ImpDiffPicker />
        <PriorityTag />
      </div>
      <Description
        name="description"
        id="description"
        placeholder="Escreva aqui a descrição da sua Atividade"
        value={description}
        setFunction={setDescription}
      />
      <KeywordsSetter />
    </>
  );
};