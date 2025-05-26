import { useContext, useImperativeHandle } from "react";
import SpecializationMenu from "./SpecializationMenu";
import ImportDifficulPicker from "../ImportDifficulPicker";
import PriorityView from "../PriorityView";
import modalStyles from "../Modal.module.css";
import KeywordsSetter from "../KeywordsSetter";
import { ModalContext } from "../../../../../store/modal-context/modal-context";
import Description from "../Description";
import Title from "../Title";
import { useMutation } from "@tanstack/react-query";
import { createActivity, updateActivity } from "../../../../../api/activities";
import { queryClient } from "../../../../../api/queryClient";
import { preProcessActivity } from "../../../../../util/api-helpers/activity";
import CondictionTag from "../CondictionTag";


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


  const { mutate: mutateCreateActivity } = useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      queryClient.invalidateQueries(['activities']);
    }
  });

  const { mutate: mutateUpdateActivity } = useMutation({
    mutationFn: updateActivity,
    onSuccess: () => {
      queryClient.invalidateQueries(['activities']);
    }
  });


  useImperativeHandle(ref, () => {
    return {
      create() {
        const [createdAt, keywordsId] = preProcessActivity(keywords);
        if (title && importance && difficulty && keywords.length > 0) {
          mutateCreateActivity({ activity: { title, description, importance, difficulty, keywords: keywordsId, createdAt } })
        }
        reset();
      },

      update() {
        const [createdAt, keywordsId] = preProcessActivity(keywords);

        if (id && (title || importance || difficulty || keywords.length > 0)) {
          mutateUpdateActivity({ activity: { id, title, description, importance, difficulty, keywords: keywordsId, createdAt } })
        };
        reset();
      },
    }
  }, [id, title, description, importance, difficulty, keywords]);


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
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>

            <p>Atividade</p>
          </div>
          <CondictionTag />
        </div>
      </div>
      <SpecializationMenu />
      <div className={modalStyles.optionMenu}>
        <ImportDifficulPicker />
        <PriorityView />
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