import { useContext } from "react";
import { CONDICTION, PRIORITY } from "../../../../util/enum";
import styles from "./FilterCard.module.css";
import { AppContext } from "../../../../store/app-context";
import { useQuery } from "@tanstack/react-query";
import { getUserKeywords } from "../../../../api/keywords";
import { getColorFromAngle } from "../../../../util/helpers/keyword.js";

export default function FilterCard({ type, value }) {
  const {
    toggleFilterCondiction,
    toggleFilterPriority,
    toggleFilterKeyword,
  } = useContext(AppContext);

  const { data: keywords } = useQuery({
    queryKey: ["keywords", localStorage.getItem("userId")],
    queryFn: ({ signal }) => getUserKeywords({ signal }),
    staleTime: 1000 * 60 * 5,
  });

  function handleOnClick() {
    if (type === "condiction") toggleFilterCondiction(value);
    if (type === "priority") toggleFilterPriority(value);
    if (type === "keyword") toggleFilterKeyword(value); // Aqui `value` é o id
  }

  let stylesProps = {
    backgroundColor: "#ccc",
    color: "#000",
    label: "Filtro",
  };

  if (type === "condiction" && CONDICTION[value]) {
    stylesProps = {
      backgroundColor: CONDICTION[value][1],
      color: CONDICTION[value][2],
      label: CONDICTION[value][0],
    };
  }

  if (type === "priority" && PRIORITY[value]) {
    stylesProps = {
      backgroundColor: PRIORITY[value][3],
      color: PRIORITY[value][4],
      label: PRIORITY[value][0],
    };
  }

  if (type === "keyword" && keywords) {
    const keyword = keywords.find((kw) => kw.id === value);
    if (keyword) {
      stylesProps = {
        backgroundColor: getColorFromAngle(keyword.colorAngle),
        color: "#1a1a1a", // ou branco se quiser mais contraste dependendo da cor
        label: keyword.name,
      };
    }
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
  );
}
