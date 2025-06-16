import { useContext } from "react";
import { AppContext } from "../../../../store/app-context";
import { dateToYYYYMMDD } from "../../../../util/date";
import styles from './DateFilterCard.module.css';


export default function DateFilterCard({ type }) {
  const { startDate, endDate, setFilterDate } = useContext(AppContext);

  let dateValue = "";

  if (type === 'start') dateValue = dateToYYYYMMDD(startDate);

  if (type === 'end') dateValue = dateToYYYYMMDD(endDate);


  return (
    <div className={styles.container}>
      <input
        type="date"
        value={dateValue ? dateValue : ""}
        onChange={(e) => setFilterDate(type, e.target.value)}
      />
    </div>
  )
}