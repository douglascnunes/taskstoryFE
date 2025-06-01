import { useState, useEffect } from 'react';
import Step from "./Step";
import styles from './TaskCard.module.css';
import { createTaskInstance, updateTaskInstance } from '../../../../../api/task';
import { cleanObject } from '../../../../../util/api-helpers/activity';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../../../api/queryClient';

export default function TaskCard({ task }) {
  const [stepStatus, setStepStatus] = useState(task.instance.stepCompletionStatus);

  const { mutate: createInstance } = useMutation({
    mutationFn: createTaskInstance,
    onSuccess: () => queryClient.invalidateQueries(['activities']),
  });

  const { mutate: updateInstance } = useMutation({
    mutationFn: updateTaskInstance,
    onSuccess: () => queryClient.invalidateQueries(['activities']),
  });

  useEffect(() => {
    setStepStatus(task.instance.stepCompletionStatus);
  }, [task.instance.stepCompletionStatus]);

  const handleToggleStep = (stepId) => {
    const updatedStatus = stepStatus.includes(stepId)
      ? stepStatus.filter((id) => id !== stepId)
      : [...stepStatus, stepId];

    setStepStatus(updatedStatus);

    const updatedInstance = {
      ...task.instance,
      stepCompletionStatus: updatedStatus,
    };

    if (task.id && !task.instance.id) {
      createInstance({ taskId: task.id, instance: cleanObject(updatedInstance) });
    } else if (task.id) {
      updateInstance({ taskId: task.id, instance: cleanObject(updatedInstance), instanceId: task.instance.id });
    }
  };

  const sortedSteps = [...task.steps].sort((a, b) => a.index - b.index);

  return (
    <div className={styles.container}>
      {sortedSteps.map((step) => (
        <Step
          key={step.id}
          step={step}
          isChecked={stepStatus.includes(step.id)}
          onToggleStep={handleToggleStep}
        />
      ))}
    </div>
  );
}
