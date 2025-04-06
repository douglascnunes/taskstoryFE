import styles from './Card.module.css';
import KeywordTag from './KeywordTag';
import TaskCard from './TaskCard';
import { STATES_CARD_COLORS } from '../../../util/color';


export default function PanelCard({ activity }) {
  let content = null;
  let finalDate = null;
  let currentState = null;

  if (activity.activityType === 'TASK') {
    finalDate = activity.task.taskInstances[0].finalDate;
    currentState = activity.task.taskInstances[0].currentState;
    content = <TaskCard task={activity.task} />;
  }

  return (
    <div
      className={styles.card}
      style={{ backgroundColor: STATES_CARD_COLORS[currentState].cardColor }}>
      <div className={styles.header}>
        <h3>{activity.title}</h3>
        <p
          className={styles.state}
          style={{ color: STATES_CARD_COLORS[currentState].nameColor }}>
          {STATES_CARD_COLORS[currentState].interfaceName}
        </p>
      </div>
      <p className={styles.description}>{activity.description}</p>

      {content}

      <div className={styles.footer}>
        <div className={styles.keywords}>
          {activity.keywords.map((keyword, index) => (
            <KeywordTag keyword={keyword} key={index} />
          ))}
        </div>
        <div className={styles.dates}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <p>{new Date(finalDate).toISOString().split('T')[0]}</p>
        </div>
      </div>
    </div>
  );
};