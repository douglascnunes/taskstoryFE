import styles from './Card.module.css';
import { ACTIVITY_TYPE } from '../../../util/enum';

export default function PanelCard({ activity }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className={styles.card}>
      <h3>{activity.title}</h3>
      <p>{activity.description}</p>
      {activity.activityType === 'TASK' && (
        <p>{formatDate(activity.task.taskInstances[0].finalDate)}</p>
      )}
    </div>
  );
};