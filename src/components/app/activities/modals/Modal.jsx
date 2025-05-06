import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../../../store/app-context";
import styles from "./Modal.module.css";
import ActivityModal from "./activity/ActivityModal";
import TaskModal from "./task/TaskModal";


export default function Modal() {
  const { isOpenModal, closeModal, setMode } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const modalRef = useRef();
  const contentModalRef = useRef();


  useEffect(() => {
    const handleClickOutside = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        contentModalRef.current.create();
        setMode(null);
        closeModal();
      };
    };
    if (isOpenModal) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpenModal, closeModal]);


  const modalType = searchParams.get('type');
  
  if (!isOpenModal) {
    return null;
  };


  let content, modalLabel;

  if (modalType === 'activity') {
    modalLabel = "Criando Atividade";
    content = <ActivityModal ref={contentModalRef} />
  }
  else if (modalType === 'task') {
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