import Step from "./Step";
import styles from './TaskCard.module.css'

export default function TaskCard({ task }) {

  return (
    <div className={styles.container}>
      {task.steps.map((step, index) => <Step key={index} step={step} />)}
    </div>
  )
};