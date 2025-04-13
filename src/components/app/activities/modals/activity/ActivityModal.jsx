import { useState } from "react";
import SpecializationMenu from "./SpecializationMenu";
import { useMutation } from "@tanstack/react-query";
import { upsertActivity } from "../../../../../api/activities";
import ImpDiffPicker from "../ImpDiffPicker";
import { IMPORTANCE_NAME, DIFFICULTY_NAME, PRIORITY_NAME } from "../../../../../util/enum";
import PriorityTag from "../task/PriorityTag";
import styles from "./ActivityModal.module.css";
import modalStyles from "../Modal.module.css";


export default function ActivityModal({ activity }) {
  const [formData, setFormData] = useState({
    title: undefined,
    description: undefined,
    keywords: [],
    importance: undefined,
    difficulty: undefined,
  });

  const { mutate } = useMutation({
    mutationFn: upsertActivity
  });


  function handleFieldChange(name, value) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function handleInsert() {
    if (activity?.id) {
      mutate({ activity: formData });
    }
    else if (
      formData.title &&
      formData.description &&
      formData.keywords.length > 0 &&
      formData.importance &&
      formData.difficulty
    ) {
      mutate({ activity: formData });
    };
    console.log("Activity inserted:", formData);
  };

  function handleChangeAndInsert(name, value) {
    handleFieldChange(name, value);
    handleInsert();
  };

  return (
    <>
      <div>
        <input
          className={modalStyles.title}
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={(e) => handleFieldChange('title', e.target.value)}
          onBlur={handleInsert}
        />
      </div>
      <SpecializationMenu />
      <div className={modalStyles.optionsMenu}>
        <PriorityTag importance={formData.importance} difficulty={formData.difficulty} />
        <ImpDiffPicker
          importance={formData.importance}
          difficulty={formData.difficulty}
          onSelect={handleChangeAndInsert}
        />

      </div>
        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={(e) => handleFieldChange('description', e.target.value)}
          onBlur={handleInsert}
        />
    </>
  );
};