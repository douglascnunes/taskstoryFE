import styles from './Step.module.css'

export default function Step({ step }) {

  return (
    <p className={styles.description}>{step.description}</p>
  )
};