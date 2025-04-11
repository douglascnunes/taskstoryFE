import TaskStep from "./TaskStep";

export default function TaskCard({ task }) {

  return (
    <>
      {task.steps.map(s => <TaskStep step={s} />)}
    </>
  )
};