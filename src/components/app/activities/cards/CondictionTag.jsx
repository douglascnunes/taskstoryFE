import styles from './CondictionTag.module.css';
import { CONDICTION } from '../../../../util/enum.jsx';
import { createTaskInstance, updateTaskInstance } from '../../../../api/task.js';
import { queryClient } from '../../../../api/queryClient.js';
import { useMutation } from '@tanstack/react-query';



export default function CondictionTag({ task}) {
  const { instance } = task;

  const { isPending: createPending, mutate: createInstance } = useMutation({
    mutationFn: createTaskInstance,
    onSuccess: () => queryClient.invalidateQueries(['activities', 'overview']),
  });

  const { isPending: updatePending, mutate: updateInstance } = useMutation({
    mutationFn: updateTaskInstance,
    onSuccess: () => queryClient.invalidateQueries(['activities', 'overview']),
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

  const [label, bgColor = "#ccc", textColor = "#333", fontSize = "1rem"] = CONDICTION[instance.condiction] ?? ["Indefinido", "#eee", "#000", "1rem"];

  return (
    <button
      className={styles.statusContainer}
      style={{
        backgroundColor: bgColor,
        fontSize,
        color: textColor,
      }}
      disabled={createPending || updatePending}
      onClick={(e) => toggleCompleted(e)}
    >
      <p style={{ color: textColor }}>{label}</p>
    </button>
  );
}
