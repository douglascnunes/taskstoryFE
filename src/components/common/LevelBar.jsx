import { PROCRASTINATION_TYPE } from '../../util/enum';
import styles from './LevelBar.module.css';

export default function LevelBar({ level, currentPoints, nextLevelPoints, procrastinationType }) {
  const procrastinationTypeLabel = PROCRASTINATION_TYPE[procrastinationType] || PROCRASTINATION_TYPE.NOTDEFINED;

  const percentage = Math.min((currentPoints / nextLevelPoints) * 100, 100);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <span className={styles.level}>Nv. {level}</span>
        <span className={styles.procrastinationType}>{procrastinationTypeLabel[0]}</span>
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.fill}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
