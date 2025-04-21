import { useContext, useImperativeHandle } from "react";
import SpecializationMenu from "./SpecializationMenu";
import ImpDiffPicker from "../ImpDiffPicker";
import PriorityTag from "../PriorityTag";
import modalStyles from "../Modal.module.css";
import KeywordsSetter from "../KeywordsSetter";
import { ModalContext } from "../../../../../store/modal-context";
import Description from "../Description";
import Title from "../Title";
import { useMutation } from "@tanstack/react-query";
import { upsertActivity } from "../../../../../api/activities";


export default function ActivityModal({ ref }) {
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
    mutationFn: upsertActivity
  });

  useImperativeHandle(ref, () => {
    return {
      upsert() {
        if (id && (title !== "" || description !== "" || importance || difficulty || keywords.length > 0)) {
          const keywordsId = keywords.map(k => k.id);
          mutate({ activity: { id, title, description, importance, difficulty, keywords: keywordsId } })
        }
        else if (title !== "" && keywords.length > 0) {
          const keywordsId = keywords.map(k => k.id);
          mutate({ activity: { title, description, importance, difficulty, keywords: keywordsId } })
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
      <SpecializationMenu />
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