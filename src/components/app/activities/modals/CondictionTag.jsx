import styles from './CondictionTag.module.css';
import { CONDICTION } from '../../../../util/enum.jsx';
import { useContext } from 'react';
import { ModalContext } from '../../../../store/modal-context/modal-context.jsx';
import { AppContext } from '../../../../store/app-context.jsx';

export default function CondictionTag({ divSize, condiction = null }) {
  const { task } = useContext(ModalContext);
  const { type: modalType } = useContext(AppContext);
  // console.log(modalType)
  // console.log(task?.instance?.condiction)
  const getStatus = () => {
    if (modalType === 'ACTIVITY') {
      return [CONDICTION['REFERENCE'][0], CONDICTION['REFERENCE'][1], CONDICTION['REFERENCE'][2]];
    }

    if (modalType === 'TASK' && task?.instance?.condiction) {
      const cond = task.instance.condiction;
      return CONDICTION[cond] ?? ["Condiction inválido", "#eee", "#000", "1rem"];
    }

    return ["Indefinido", "#eee", "#000", "1rem"];
  };


  const [label, bgColor = "#ccc", textColor = "#333", fontSize = "1rem"] = condiction ?? getStatus();

  return (
    <div
      className={styles.statusContainer}
      style={{
        backgroundColor: bgColor,
        fontSize,
        color: textColor,
        ...divSize
      }}
    >
      <p style={{ color: textColor }}>{label}</p>
    </div>
  );
}
