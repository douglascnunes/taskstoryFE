import { CONDICTION } from "../../../../util/enum"
import styles from "./FilterCard.module.css";


export default function FilterCard({ value }) {

  return (
    <button
      className={styles.container}
      style={{ 
        backgroundColor: CONDICTION[value][1],
        color: CONDICTION[value][2]
       }}
    >
      {CONDICTION[value][0]}
    </button>
  )
}