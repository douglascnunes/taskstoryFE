import styles from './Card.module.css';
import KeywordTag from '../KeywordTag';
import TaskCard from './task/TaskCard';
import { STATES_CARD_COLORS } from '../../../../util/color';


export default function PanelCard({ activity }) {
  let content = null;
  let finalDate = null;
  let currentStatus = null;

  if (activity.type === 'TASK') {
    finalDate = activity.task.taskInstances[0].finalDate;
    currentStatus = activity.task.taskInstances[0].currentStatus;
    content = <TaskCard task={activity.task} />
  }

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: STATES_CARD_COLORS[currentStatus].cardColor }}>
      <div className={styles.header}>
        <h3>{activity.title}</h3>
        <p
          className={styles.status}
          style={{ color: STATES_CARD_COLORS[currentStatus].nameColor }}>
          {STATES_CARD_COLORS[currentStatus].interfaceName}
        </p>
      </div>
      <p className={styles.description}>{activity.description}</p>

      {content}

        <div className={styles.keywords}>
          {activity.keywords.map((keyword, index) => (
            <KeywordTag keyword={keyword} key={index} />
          ))}
        </div>
        <div className={styles.dates}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        <p>{new Date(finalDate).toISOString().split('T')[0]}</p>
    </div>
    </div >
  );
};