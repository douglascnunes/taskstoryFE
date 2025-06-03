import { useContext, useEffect, useState } from 'react';
import styles from './CondictionTag.module.css';
import { CONDICTION } from '../../../../util/enum.jsx';
import { ModalContext } from '../../../../store/modal-context/modal-context.jsx';
import { AppContext } from '../../../../store/app-context.jsx';
import { compareDatesOnly } from '../../../../util/date.js';

export default function CondictionTag({ divSize }) {
  const { task } = useContext(ModalContext);
  const { mode, type: modalType } = useContext(AppContext);

  const [condiction, setCondiction] = useState("REFERENCE");

  useEffect(() => {
    let newCondiction = "REFERENCE";

    if (mode === 'CREATE') {
      if (modalType === 'TASK') {
        const isNoEndPeriod = !task.endPeriod;
        const isNoInterval = !task.frequenceIntervalDays;
        const isNoWeekly = !task.frequenceWeeklyDays || task.frequenceWeeklyDays.length === 0;

        if (isNoEndPeriod && isNoInterval && isNoWeekly) {
          newCondiction = "INCUBATION";
        } else if (task.endPeriod && compareDatesOnly(task.endPeriod, new Date()) < 0) {
          newCondiction = "TODO_LATE";
        } else if (!isNoEndPeriod || !isNoInterval || !isNoWeekly) {
          newCondiction = "TODO";
        }
      }
    } else {
      if (modalType === 'TASK') {
        const isLate = compareDatesOnly(new Date(task.instance.finalDate), new Date()) < 0;
        const isDoing = task.instance.stepCompletionStatus.length > 0;

        if (isLate) {
          if (isDoing) newCondiction = "DOING_LATE";
          else newCondiction = "TODO_LATE";
        } else {
          if (isDoing) newCondiction = "DOING";
          else newCondiction = "TODO";
        }
      }
    };

    setCondiction(newCondiction);
  }, [
    mode,
    modalType,
    task.endPeriod,
    task.frequenceIntervalDays,
    task.frequenceWeeklyDays,
    task.instance?.condiction,
    task.instance.stepCompletionStatus,
  ]);

  const [label, bgColor = "#ccc", textColor = "#333", fontSize = "1rem"] = CONDICTION[condiction] ?? ["Indefinido", "#eee", "#000", "1rem"];

  return (
    <div
      className={styles.statusContainer}
      style={{
        backgroundColor: bgColor,
        fontSize,
        color: textColor,
        ...divSize
      }}
    >
      <p style={{ color: textColor }}>{label}</p>
    </div>
  );
}
