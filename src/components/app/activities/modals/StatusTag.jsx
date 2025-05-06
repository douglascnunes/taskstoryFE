import styles from './StatusTag.module.css';
import { STATUS_NAME } from '../../../../util/enum.js';
import { useContext, useMemo } from 'react';
import { ModalContext } from '../../../../store/modal-context.jsx';





export default function StatusTag() {
  const { type, task } = useContext(ModalContext);

  let status;
  if (type === 'activity') {
    status = [...STATUS_NAME[0], "1rem"]
  };

  if (type === "task") {
    const { endPeriod, frequenceIntervalDays, frequenceWeeklyDays } = task;
    const defineDate = (task.endPeriod || task.frequenceIntervalDays || task.frequenceWeeklyDays.length > 0);

    status = useMemo(() => {
      const today = new Date();
      if (!defineDate) {
        return STATUS_NAME[1]
      }
      if (task.endPeriod && new Date(task.endPeriod) < today) {

        return [...STATUS_NAME[3], "0.8rem"];
      }

      else return STATUS_NAME[2]
    }, [task, endPeriod, frequenceIntervalDays, frequenceWeeklyDays]);
  }

  const [label, bgColor = "#ccc", textColor = "#333", fontSize = "1rem "] = status;

  return (
    <div
      className={styles.statusContainer}
      style={{ backgroundColor: bgColor, fontSize: fontSize }}
    >
      <p style={{ color: textColor }}>{label}</p>
    </div>
  );
}