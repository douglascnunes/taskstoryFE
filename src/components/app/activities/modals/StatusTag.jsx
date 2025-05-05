import styles from './StatusTag.module.css';
import { STATUS_NAME } from '../../../../util/enum.js';
import { useContext, useMemo } from 'react';
import { ModalContext } from '../../../../store/modal-context.jsx';





export default function StatusTag() {
  const { type, task } = useContext(ModalContext);
  const { endPeriod, frequenceIntervalDays, frequenceWeeklyDays } = task;

  const defineDate = (task.endPeriod || task.frequenceIntervalDays || task.frequenceWeeklyDays.length > 0);

  const status = useMemo(() => {
    const today = new Date();

    if (type === "task") {
      if (!defineDate) {
        return STATUS_NAME[1]
      }
      if (task.endPeriod && new Date(task.endPeriod) < today) {
        
        return [...STATUS_NAME[3], "0.8rem"];
      }
      
      else return STATUS_NAME[2]
    };
  }, [task, endPeriod, frequenceIntervalDays, frequenceWeeklyDays])


  const [label, bgColor = "#ccc", textColor = "#333", fontSize = "1rem "] = status;

  return (
    <div
      className={styles.statusContainer}
      style={{ backgroundColor: bgColor, fontSize: fontSize}}
    >
      <p style={{ color: textColor }}>{label}</p>
    </div>
  );
}