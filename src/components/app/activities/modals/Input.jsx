import styles from './Input.module.css';


export default function Input({ setFunction, ...props }) {
  return (
    <input
      className={styles.input}
      {...props}
      onChange={(e) => setFunction(e.target.value)}
    />
  );
};