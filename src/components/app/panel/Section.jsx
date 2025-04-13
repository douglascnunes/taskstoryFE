import styles from './Section.module.css';
import Card from '../activities/cards/Card';

export default function Section({ activities, name }) {

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionName}>{name}</h3>
      <hr className={styles.divider} />
      {activities.map(activity => (
        <Card key={activity.id} activity={activity} />
      ))}
    </div>
  );
}