import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../../../store/panel-context";
import styles from "./Modal.module.css";
import ActivityModal from "./activity/ActivityModal";


export default function Modal({ activity }) {
  const { isOpenModal, closeModal } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const modalRef = useRef();


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };
    if (isOpenModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenModal, closeModal]);


  if (!isOpenModal) {
    return null;
  };


  let content;

  if (searchParams.get('mode') === 'activity') {
    content = <ActivityModal />
  };


  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        {content}
      </ div>
    </div>
  )
};