// AddFilterModal.jsx
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./AddFilterModal.module.css";
import { CONDICTION } from "../../../../util/enum";
import { AppContext } from "../../../../store/app-context";

export default function AddFilterModal({ isOpenModal, closeModal }) {
  const { toggleFilterCondiction } = useContext(AppContext);
  const [mode, setMode] = useState('start')
  const modalRef = useRef(null);




  useEffect(() => {
    const handleClickOutside = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setMode('start')
        closeModal();
      };
    };

    if (isOpenModal) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpenModal, closeModal]);


  let buttonCategoryList = (
    <div>
      <h3 className={styles.title}>Escolha uma categoria de Filtro</h3>
      <div className={styles.buttonCatList}>
        <button
          className={styles.buttonCategory}
          style={{ backgroundColor: '#e08585' }}
          onClick={() => setMode('condiction')}
        >
          Condição
        </button>
        <button
          className={styles.buttonCategory}
          style={{ backgroundColor: '#85e094' }}
          onClick={() => setMode('priority')}
        >
          Prioridade
        </button>
        <button
          className={styles.buttonCategory}
          style={{ backgroundColor: '#85a3e0' }}
          onClick={() => setMode('keyword')}
        >
          Palavra-Chave
        </button>
      </div>
    </div>
  );


  let choiceContent;

  if (mode === 'condiction') {
    choiceContent = (
      <div className={styles.condictionList}>
        <p>Escolha uma Condição</p>
        {Object.entries(CONDICTION).map(([key, [label, tagColor, labelColor, cardColor, orderValue]]) => (
          <button
            key={key}
            style={{ backgroundColor: cardColor, color: labelColor, }}
            onClick={() => toggleFilterCondiction(key)}
          >
            {label}
          </button>
        ))}
      </div>
    );
  }


  if (!isOpenModal) {
    return null;
  };


  return (
    <div className={styles.overlay}>
      {/* <h2 className={styles.modalLabel}>{modalLabel}</h2> */}
      <div className={styles.modal} ref={modalRef}>
        {mode === 'start' && buttonCategoryList}
        {mode !== 'start' && choiceContent}
      </ div>
    </div>
  );
}
