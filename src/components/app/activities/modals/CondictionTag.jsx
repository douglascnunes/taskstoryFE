import { useContext, useEffect, useState } from 'react';
import styles from './CondictionTag.module.css';
import { CONDICTION } from '../../../../util/enum.jsx';
import { ModalContext } from '../../../../store/modal-context/modal-context.jsx';
import { AppContext } from '../../../../store/app-context.jsx';
import { compareDatesOnly } from '../../../../util/date.js';
import { useMutation } from '@tanstack/react-query';
import { createTaskInstance, updateTaskInstance } from '../../../../api/task.js';
import { queryClient } from '../../../../api/queryClient.js';



export default function CondictionTag({ divSize }) {
  const { id, title, description, importance, difficulty, keywords, type, task, loader } = useContext(ModalContext);
  const { mode, type: modalType } = useContext(AppContext);
  const { instance } = task;

  const [condiction, setCondiction] = useState("REFERENCE");

  const { isPending, mutate: createInstance } = useMutation({
    mutationFn: createTaskInstance,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['activities'])
      loader({id, title, description, importance, difficulty, keywords, type, task}, data.instance);
    },
  });

  const { mutate: updateInstance } = useMutation({
    mutationFn: updateTaskInstance,
    onSuccess: () => queryClient.invalidateQueries(['activities']),
  });

  function toggleCompleted(e) {
    e.stopPropagation()
    instance.completedOn = instance.completedOn ? undefined : new Date().toISOString();

    if (task.id && !task.instance.id) {
      createInstance({ taskId: task.id, instance: instance });
    } else if (task.id) {
      updateInstance({ taskId: task.id, instance: instance, instanceId: instance.id });
    }
  };

  useEffect(() => {
    let newCondiction = "REFERENCE";

    if (mode === 'CREATE') {
      if (modalType === 'TASK') {

        const isNoWeekly = !task.frequenceWeeklyDays || task.frequenceWeeklyDays.length === 0;

        if (!task.endPeriod && !task.frequenceIntervalDays && (isNoWeekly)) {
          newCondiction = "INCUBATION";
        } else if (task.endPeriod && compareDatesOnly(task.endPeriod, new Date()) < 0) {
          newCondiction = "TODO_LATE";
        } else if (task.endPeriod || task.frequenceWeeklyDays || !isNoWeekly) {
          newCondiction = "TODO";
        }
      }
    } else {
      if (modalType === 'TASK') {
        const isLate = compareDatesOnly(new Date(task.instance.finalDate), new Date()) < 0;
        const isDoing = task.instance.stepCompletionStatus.length > 0;
        const isDone = !!task.instance.completedOn;

        if (isLate) {
          if (isDone) newCondiction = "DONE_LATE";
          else if (isDoing) newCondiction = "DOING_LATE";
          else newCondiction = "TODO_LATE";
        } else {
          if (isDone) newCondiction = "DONE";
          else if (isDoing) newCondiction = "DOING";
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
    task.instance?.completedOn
  ]);

  const [label, bgColor = "#ccc", textColor = "#333", fontSize = "1rem"] = CONDICTION[condiction] ?? ["Indefinido", "#eee", "#000", "1rem"];

  return (
    <button
      className={styles.statusContainer}
      onClick={(e) => toggleCompleted(e)}
      disabled={isPending}
      style={{
        backgroundColor: bgColor,
        fontSize,
        color: textColor,
        ...divSize
      }}
    >
      <p style={{ color: textColor }}>{label}</p>
    </button>
  );
}
