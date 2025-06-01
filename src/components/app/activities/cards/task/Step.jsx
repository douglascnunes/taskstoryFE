import styles from './Step.module.css'



export default function Step({ step, isChecked, onToggleStep }) {
  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onToggleStep(step.id)}
        onClick={(e) => e.stopPropagation()}
      />
      <p className={styles.description}>{step.description}</p>
    </div>
  );
}
