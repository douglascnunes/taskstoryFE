import styles from './Title.module.css';


export default function Title({ setFunction, ...props }) {
  return (
    <input
      className={styles.title}
      {...props}
      onChange={(e) => setFunction(e.target.value)}
    />
  );
};