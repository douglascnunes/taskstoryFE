import styles from './Card.module.css';

export default function PanelCard({ activity }) {
  return (
    <div className={styles.card}>
      <h3>{activity.title}</h3>
      <p>{activity.description}</p>
    </div>
  );
};