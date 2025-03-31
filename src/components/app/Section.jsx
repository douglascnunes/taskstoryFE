import styles from './Section.module.css';
import Card from './activities/Card';

export default function Section({ activities, name }) {
  const isClosed = activities.length === 0;

  return (
    <div className={`${styles.section} ${isClosed ? styles.closed : ''}`}>
      <h3 className={styles.sectionName}>{name}</h3>
      <hr className={styles.divider} />
      {activities.map(activity => (
        <Card key={activity.id} activity={activity} />
      ))}
    </div>
  );
}