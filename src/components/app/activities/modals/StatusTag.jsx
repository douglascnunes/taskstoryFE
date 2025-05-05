import styles from './StatusTag.module.css';
import { STATUS_NAME } from '../../../../util/enum.js';
import { useContext, useMemo } from 'react';
import { ModalContext } from '../../../../store/modal-context.jsx';





export default function StatusTag() {
  const { type, task } = useContext(ModalContext);
  const { endPeriod, frequenceIntervalDays, frequenceWeeklyDays } = task;

  const defineDate = (task.endPeriod || task.frequenceIntervalDays || task.frequenceWeeklyDays.length > 0);

  const status = useMemo(() => {
    if (type === "task") {
      if (!defineDate) {
        return STATUS_NAME[1]
      }
      else return STATUS_NAME[2]
    };
  }, [task, endPeriod, frequenceIntervalDays, frequenceWeeklyDays])


  const [label, bgColor = "#ccc", textColor = "#333"] = status;

  return (
    <div
      className={styles.statusContainer}
      style={{ backgroundColor: bgColor }}
    >
      <p style={{ color: textColor }}>{label}</p>
    </div>
  );
}