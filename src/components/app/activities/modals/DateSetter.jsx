import { useContext, useState } from "react"
import { ModalContext } from "../../../../store/modal-context/modal-context"
import styles from './DateSetter.module.css';
import DateModal from "./DateModal";


export default function DateSetter() {
  const { task } = useContext(ModalContext);
  const [isOpenDateModal, setIsOpenDateModal] = useState(false);

  function openDateModal() {
    setIsOpenDateModal(true);
  };

  function closeDateModal() {
    setIsOpenDateModal(false);
  };

  let spanContent = "";

  const hasInterval = !!task.frequenceIntervalDays;
  const hasWeekly = (task.frequenceWeeklyDays && task.frequenceWeeklyDays.length > 0);
  const hasEnd = !!task.endPeriod;

  if (hasInterval) {
    const days = parseInt(task.frequenceIntervalDays, 10);
    spanContent = `A cada ${days} dia${days > 1 ? 's' : ''}`;
  } else if (hasWeekly) {
    const times = task.frequenceWeeklyDays.length;
    spanContent = `${times} vez${times > 1 ? 'es' : ''} na Sem`;
  };

  if (hasEnd && (hasInterval || hasWeekly)) {
    spanContent += ` até ${new Date(task.endPeriod).toLocaleDateString()}`;
  } else if (hasEnd) {
    spanContent = `Termina em ${new Date(task.endPeriod).toLocaleDateString()}`;
  };

  if (!hasInterval && !hasWeekly && !hasEnd) {
    spanContent = "Não definido";
  };


  return (
    <>
      <DateModal
        isOpenModal={isOpenDateModal}
        closeModal={closeDateModal}
      />
      <div className={styles.container} onClick={openDateModal}>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
          </svg>
          <h3>Período e repetição</h3>
        </div>
        <span>{spanContent}</span>
      </div>
    </>
  )
};