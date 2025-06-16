import { useContext } from 'react';
import styles from './FloatingDateButton.module.css';
import { AppContext } from '../../../store/app-context';

export default function FloatingDateButton({ type }) {
  const { startDate, endDate, setFilterDate } = useContext(AppContext);

  const isStart = type === 'start';

  function handleClick() {
    let newDate;
    if (isStart) {
      newDate = new Date(startDate);
      newDate.setMonth(newDate.getMonth() - 3);
    } else {
      newDate = new Date(endDate);
      newDate.setMonth(newDate.getMonth() + 3);
    }

    setFilterDate(type, newDate);

    requestAnimationFrame(() => {
      const scrollEl = document.documentElement; // ou document.body, dependendo de quem está scrollando
      const maxScrollLeft = scrollEl.scrollWidth - scrollEl.clientWidth;

      scrollEl.scrollTo({
        left: isStart ? 0 : maxScrollLeft,
        behavior: 'smooth',
      });
    });
  }

  return (
    <button
      className={`${styles.container} ${isStart ? styles.left : styles.right}`}
      onClick={handleClick}
    >
      {isStart ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      )}
    </button>
  );
}
