import React, { useState } from 'react';
import styles from './Question.module.css';

function Question({ idx, question, onSelect }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className={styles.questionContainer}>
      <h1>Pergunta {idx + 1}</h1>
      <p>{question[0]}</p>
      <div className={styles.circlesContainer}>
        <p>{question[1]}</p>
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} className={styles.circleWrapper}
            onClick={() => {
              setSelected(num);
              onSelect(question[3], idx, num)
            }
            }
          >
            <div className={styles.circleNumber}>{num}</div>
            <div className={`${styles.circle} ${selected === num ? styles.selected : ''}`} />
          </div>
        ))}
        <p>{question[2]}</p>
      </div>
    </div>
  );
}

export default Question;
