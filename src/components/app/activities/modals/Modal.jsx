import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../../../store/app-context";
import styles from "./Modal.module.css";
import ActivityModal from "./activity/ActivityModal";
import TaskModal from "./task/TaskModal";


export default function Modal() {
  const { isOpenModal, closeModal } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const modalRef = useRef();
  const contentModalRef = useRef();


  useEffect(() => {
    const handleClickOutside = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        contentModalRef.current.upsert();
        closeModal();
      };
    };
    if (isOpenModal) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpenModal, closeModal]);


  const mode = searchParams.get('mode');

  if (!isOpenModal) {
    return null;
  };


  let content;

  if (mode === 'activity') {
    content = <ActivityModal ref={contentModalRef} />
  }
  else if (mode === 'task') {
    content = <TaskModal ref={contentModalRef} />
  }


  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        {content}
      </ div>
    </div>
  )
};