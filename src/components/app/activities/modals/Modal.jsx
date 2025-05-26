import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../../../store/app-context";
import styles from "./Modal.module.css";
import ActivityModal from "./activity/ActivityModal";
import TaskModal from "./task/TaskModal";


export default function Modal() {
  const { isOpenModal, mode, type, closeModal } = useContext(AppContext);
  const modalRef = useRef();
  const contentModalRef = useRef();

  useEffect(() => {
    const handleClickOutside = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        if (mode === 'CREATE') contentModalRef.current.create();
        if (mode === 'UPDATE') contentModalRef.current.update();
        closeModal();
      };
    };

    if (isOpenModal) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // <--- trava o scroll
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = ''; // <--- libera o scroll
    };
  }, [isOpenModal, closeModal]);


  if (!isOpenModal) {
    return null;
  };


  let content, modalLabel;

  if (type === 'ACTIVITY') {
    modalLabel = "Criando Atividade";
    content = <ActivityModal ref={contentModalRef} />
  }
  else if (type === 'TASK') {
    modalLabel = "Criando Tarefa";
    content = <TaskModal ref={contentModalRef} />
  }


  return (
    <div className={styles.overlay}>
      {/* <h2 className={styles.modalLabel}>{modalLabel}</h2> */}
      <div className={styles.modal} ref={modalRef}>
        {content}
      </ div>
    </div>
  )
};