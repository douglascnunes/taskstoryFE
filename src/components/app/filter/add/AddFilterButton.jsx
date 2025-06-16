import { useState } from "react";
import AddFilterModal from "./AddFilterModal";


export default function AddFilterButton() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  };


  return (
    <>
      <button
        className="button"
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
