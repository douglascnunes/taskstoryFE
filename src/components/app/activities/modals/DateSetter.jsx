import { useContext, useState } from "react"
import { ModalContext } from "../../../../store/modal-context/modal-context"
import styles from './DateSetter.module.css';
import DateModal from "./DateModal";
import { dateToYYYYMMDD } from "../../../../util/date";

export default function DateSetter() {
  const { type, task } = useContext(ModalContext);
  const [isOpenKeywordModal, setIsOpenKeywordModal] = useState(false);
  function openDateModal() {
    setIsOpenKeywordModal(true);
  };

  function closeDateModal() {
    setIsOpenKeywordModal(false);
  };

  let finalDate;
  if (type === 'task') {
    finalDate = task.instance.finalDate;
  };

  return (
    <>
      <DateModal
        isOpenModal={isOpenKeywordModal}
        closeModal={closeDateModal}
      />
      <div className={styles.container}>
        <div className={styles.show}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <h3>Prazo Final</h3>
          </div>
          <input
            type="date"
            id="date"
            value={dateToYYYYMMDD(finalDate)}
            // onChange={(e) => handleSetPeriod("endPeriod", e.target.value)}
          />
          {/* <button onClick={() => clearData("endPeriod")}>Limpar</button> */}
        </div>
        <div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>
            <h3>Frequência</h3>
          </div>
          <div onClick={openDateModal}>
            {/* {finalDate && <p>{finalDate}</p>} */}
            {/* {!finalDate && <p> -- / -- / ----</p>} */}
          </div>
        </div>
      </div>
    </>
  )
};