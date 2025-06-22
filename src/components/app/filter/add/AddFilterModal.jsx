import { useContext, useEffect, useRef, useState } from "react";
import styles from "./AddFilterModal.module.css";
import { CONDICTION, PRIORITY } from "../../../../util/enum";
import { AppContext } from "../../../../store/app-context";
import { useQuery } from "@tanstack/react-query";
import { getUserKeywords } from "../../../../api/keywords";
import { getColorFromAngle } from "../../../../util/helpers/keyword.js";

export default function AddFilterModal({ isOpenModal, closeModal }) {
  const {
    filterCondictions,
    filterPriorities,
    filterKeywords,
    toggleFilterCondiction,
    toggleFilterPriority,
    toggleFilterKeyword,
  } = useContext(AppContext);

  const [mode, setMode] = useState("start");
  const modalRef = useRef(null);

  const { data: keywords } = useQuery({
    queryKey: ["keywords", localStorage.getItem("userId")],
    queryFn: ({ signal }) => getUserKeywords({ signal }),
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setMode("start");
        closeModal();
      }
    };

    if (isOpenModal) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpenModal, closeModal]);

  const availableCondictionKeys = ["TODO", "TODO_LATE", "DOING", "DOING_LATE", "DONE", "DONE_LATE"];

  let choiceContent;
  if (mode === "condiction") {
    choiceContent = (
      <div className={styles.condictionList}>
        <p>Escolha uma Condição</p>
        {Object.entries(CONDICTION).map(([key, [label, tagColor, labelColor, cardColor]]) => {
          if (!availableCondictionKeys.includes(key)) return null;

          const isSelected = filterCondictions.includes(key);
          return (
            <button
              key={key}
              className={`${isSelected ? styles.selected : ""}`}
              style={{ backgroundColor: cardColor, color: labelColor }}
              onClick={() => toggleFilterCondiction(key)}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  }

  if (mode === "priority") {
    choiceContent = (
      <div className={styles.condictionList}>
        <p>Escolha uma Prioridade</p>
        {Object.entries(PRIORITY).map(([key, [label, , , divColor, labelColor]]) => {
          const isSelected = filterPriorities.includes(key);
          return (
            <button
              key={key}
              className={`${isSelected ? styles.selected : ""}`}
              style={{ backgroundColor: divColor, color: labelColor }}
              onClick={() => toggleFilterPriority(key)}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  }

  if (mode === "keyword" && keywords) {
    choiceContent = (
      <div className={styles.condictionList}>
        <p>Escolha uma Palavra-Chave</p>
        {keywords.map((keyword) => {
          const isSelected = filterKeywords.includes(keyword.id);
          return (
            <button
              key={keyword.id}
              className={`${isSelected ? styles.selected : ""}`}
              style={{
                backgroundColor: getColorFromAngle(keyword.colorAngle),
                color: "#1a1a1a",
              }}
              onClick={() => toggleFilterKeyword(keyword.id)}
            >
              {keyword.name}
            </button>
          );
        })}
      </div>
    );
  }

  if (!isOpenModal) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        {mode === "start" && (
          <>
            <h3 className={styles.title}>Escolha uma categoria de Filtro</h3>
            <div className={styles.buttonCatList}>
              <button
                className={styles.buttonCategory}
                style={{ backgroundColor: "#e08585" }}
                onClick={() => setMode("condiction")}
              >
                Condição
              </button>
              <button
                className={styles.buttonCategory}
                style={{ backgroundColor: "#85e094" }}
                onClick={() => setMode("priority")}
              >
                Prioridade
              </button>
              <button
                className={styles.buttonCategory}
                style={{ backgroundColor: "#85a3e0" }}
                onClick={() => setMode("keyword")}
              >
                Palavra-Chave
              </button>
            </div>
          </>
        )}
        {mode !== "start" && choiceContent}
        {mode !== "start" && (
          <button className={`${styles.button} button`} onClick={() => setMode("start")}>
            Voltar
          </button>
        )}
      </div>
    </div>
  );
}
