import { useState } from "react";
import AddFilterModal from "./AddFilterModal";
import styles from './AddFilterButton.module.css';


export default function AddFilterButton() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  };


  return (
    <>
      <button
        className={`${styles.button} button`}
        onClick={toggleModal}
      >
        +
      </button>

      <AddFilterModal
        isOpenModal={isOpen}
        closeModal={toggleModal}
      />
    </>
  );
}
