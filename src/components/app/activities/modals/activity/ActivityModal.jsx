import { forwardRef, useContext, useImperativeHandle, useState } from "react";
import SpecializationMenu from "./SpecializationMenu";
import ImpDiffPicker from "../ImpDiffPicker";
import PriorityTag from "../PriorityTag";
import styles from "./ActivityModal.module.css";
import modalStyles from "../Modal.module.css";
import KeywordsPicker from "../KeywordsPicker";
import { useMutation } from "@tanstack/react-query";
import { upsertActivity } from "../../../../../api/activities";
import { AppContext } from "../../../../../store/app-context";


const ActivityModal = forwardRef(function ActivityModal(_, ref) {
  const { closeModal } = useContext(AppContext);
  const [activityData, setActivityData] = useState({
    id: null,
    title: "",
    description: "",
    importance: "MEDIUM",
    difficulty: "MEDIUM",
    keywords: [],
  });

  const { mutate } = useMutation({
    mutationFn: upsertActivity
  });


  function handleChangeData(field, value) {
    setActivityData((prev) => {
      return {
        ...prev,
        [field]: value
      };
    });
  };


  function keywordToggle(keyword) {
    setActivityData(prev => {
      const exists = prev.keywords.some(k => k.id === keyword.id);

      return {
        ...prev,
        keywords: exists
          ? prev.keywords.filter(k => k.id !== keyword.id)
          : [...prev.keywords, keyword],
      };
    });
  };


  function handleUpdateActivity(field, value) {
    if (field && value) {
      handleChangeData(field, value);
    }
    if (activityData.id &&
      (activityData.title !== "" && activityData.description !== "" && activityData.keywords.length > 0)) {
      mutate({ activity: activityData });
    };
  };


  function handleCreateActivity() {
    if (activityData.title !== "" && activityData.keywords.length > 0) {
      mutate({ activity: activityData });
    };
  };

  useImperativeHandle(ref, () => ({
    handleCreateActivity,
  }));


  return (
    <>
      <div>
        <input
          className={modalStyles.title}
          type="text"
          name="title"
          placeholder="Título"
          value={activityData.title}
          onChange={(e) => handleChangeData('title', e.target.value)}
          onBlur={handleUpdateActivity}
        />
      </div>
      <SpecializationMenu />
      <div className={modalStyles.optionMenu}>
        <ImpDiffPicker
          importance={activityData.importance}
          difficulty={activityData.difficulty}
          onChange={handleUpdateActivity}
        />
        <PriorityTag
          importance={activityData.importance}
          difficulty={activityData.difficulty}
        />
      </div>
      <div>
        <div className={styles.label}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
          </svg>
          <label htmlFor="description">Descrição</label>
        </div>
        <textarea
          name="description"
          id="description"
          placeholder="Escreva aqui a descrição da sua atividade"
          value={activityData.description}
          onChange={(e) => handleChangeData('description', e.target.value)}
          onBlur={handleUpdateActivity}
        />
      </div>
      <KeywordsPicker keywords={activityData.keywords} keywordToggle={keywordToggle} />
    </>
  );
});

export default ActivityModal;