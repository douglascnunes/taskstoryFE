import { useContext, useState } from "react"
import { ModalContext } from "../../../../store/modal-context/modal-context"
import styles from './DateSetter.module.css';
import DateModal from "./DateModal";
import { dateToYYYYMMDD, yyyymmddToDate } from "../../../../util/date";
import { AppContext } from "../../../../store/app-context";
import { createInstance, updateTaskInstance } from "../../../../api/task";
import { cleanObject } from "../../../../util/api-helpers/activity";
import { useMutation } from "@tanstack/react-query";


export default function DateSetter() {
  const { mode } = useContext(AppContext);
  const { type, task, setFinalDate } = useContext(ModalContext);
  const [isOpenKeywordModal, setIsOpenKeywordModal] = useState(false);

  function openDateModal() {
    setIsOpenKeywordModal(true);
  };

  function closeDateModal() {
    setIsOpenKeywordModal(false);
  };

  const { mutate: mutateCreate } = useMutation({ mutationFn: createInstance });
  const { mutate: mutateUpdate } = useMutation({ mutationFn: updateTaskInstance });

  function handleChangeEndPeriod(value) {
    const valueDate = yyyymmddToDate(value);
    setFinalDate(valueDate);
    const cleanedInstance = cleanObject(task.instance);

    if (!task.instance.id) {
      mutateCreate({ taskId: task.id, instance: cleanedInstance });
    } else {
      mutateUpdate({ taskId: task.id, instance: cleanedInstance, instanceId: task.instance.id });
    }
  };



  let finalDateContent = null;
  let finalDate;
  if (type === 'task') {
    finalDate = new Date(task.instance.finalDate);
  };

  if (mode === 'UPDATE') {
    finalDateContent = (
      <div className={styles.content}>
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
          onChange={(e) => handleChangeEndPeriod(e.target.value)}
        />
      </div>
    )
  };

  let frequencyContent;

  if (task.frequenceIntervalDays) {
    const days = parseInt(task.frequenceIntervalDays);
    frequencyContent = <span>A cada {days} dia{days > 1 ? 's' : ''}</span>;
  } else if (task.frequenceWeeklyDays.length > 0) {
    const times = task.frequenceWeeklyDays.length;
    frequencyContent = <span>{times} vez{times > 1 ? 'es' : ''} na Sem.</span>;
  } else if (task.endPeriod) {
    frequencyContent = <span>Uma execução</span>;
  } else {
    frequencyContent = <span className={styles.notDefined}>Não Definido</span>;
  };


  return (
    <>
      <DateModal
        isOpenModal={isOpenKeywordModal}
        closeModal={closeDateModal}
      />
      <div className={styles.container}>
        {finalDateContent}
        <div className={styles.content} onClick={openDateModal}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>
            <h3>Frequência</h3>
          </div>
          <div>
            {frequencyContent}
          </div>
        </div>
      </div>
    </>
  )
};