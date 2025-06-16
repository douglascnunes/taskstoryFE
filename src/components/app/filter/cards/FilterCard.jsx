import { useContext } from "react";
import { CONDICTION, PRIORITY } from "../../../../util/enum"
import styles from "./FilterCard.module.css";
import { AppContext } from "../../../../store/app-context";


export default function FilterCard({ type, value }) {
  const { toggleFilterCondiction, toggleFilterPriority } = useContext(AppContext);

  function handleOnClick() {
    if (type === 'condiction')
      toggleFilterCondiction(value);

    if (type === 'priority')
      toggleFilterPriority(value);
  }

  let stylesProps = {};

  if (type === 'condiction') {
    stylesProps.backgroundColor = CONDICTION[value][1];
    stylesProps.color = CONDICTION[value][2];
    stylesProps.label = CONDICTION[value][0];
  }

  if (type === 'priority') {
    stylesProps.backgroundColor = PRIORITY[value][3];
    stylesProps.color = PRIORITY[value][4];
    stylesProps.label = PRIORITY[value][0];
  }


  return (
    <button
      className={styles.container}
      style={{
        backgroundColor: stylesProps.backgroundColor,
        color: stylesProps.color,
      }}
      onClick={handleOnClick}
    >
      {stylesProps.label}
    </button>
  )
}