import TaskStep from "./Step";

export default function TaskCard({ task }) {

  return (
    <>
      {task.steps.map(s => <TaskStep step={s} />)}
    </>
  )
};