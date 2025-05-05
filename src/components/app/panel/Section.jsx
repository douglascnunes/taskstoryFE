import styles from './Section.module.css';
import Card from '../activities/cards/Card';

export default function Section({ activities, monthName, year }) {

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionName}>{`${monthName} ${year}`}</h3>
      <hr className={styles.divider} />
      {activities.map((activity, index) => (
        <Card key={index} activity={activity} />
      ))}
    </div>
  );
}