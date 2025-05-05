import styles from './Card.module.css';
import KeywordTag from '../KeywordTag';
import TaskCard from './task/TaskCard';
import { STATES_CARD_COLORS } from '../../../../util/color';


export default function PanelCard({ activity }) {
  let content = null;
  let finalDate = null;
  let status = null;

  if (activity.type === 'TASK') {
    finalDate = new Date(activity.task.taskInstances.finalDate);
    status = activity.task.taskInstances.currentStatus;
    content = <TaskCard task={activity.task} />
  };


  return (
    <div
      className={styles.container}
      style={{ backgroundColor: STATES_CARD_COLORS[status].cardColor }}>
      <div className={styles.header}>
        <h3>{activity.title}</h3>
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
        <p>{`${new Date(activity.task.taskInstances.finalDate).toLocaleDateString('pt-br', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })}`}</p>
    </div>
    </div >
  );
};