import { useContext, useEffect, useRef, useState } from 'react';
import styles from './DateModal.module.css';
import { ModalContext } from '../../../../store/modal-context/modal-context.jsx';
import { compareDatesOnly, dateToYYYYMMDD } from '../../../../util/date.js';
import { DAYS_OF_WEEK } from '../../../../util/enum.jsx';


export default function DateModal({ isOpenModal, closeModal }) {
  const { task,
    setTaskStartPeriod, setTaskEndPeriod, setTaskFrequenceIntervalDays, setTaskFrequenceWeeklyDays,
    isActivityChange, setIsActivityChange,
  } = useContext(ModalContext);
  const [mode, setMode] = useState(
    (task.frequenceIntervalDays == true || task.frequenceWeeklyDays == true) ? 'MULTI' : 'SINGLE')
  const modalRef = useRef();

  function toggleMode() {
    setMode(prev => prev === "SINGLE" ? "MULTI" : "SINGLE")
  };

  function handleSetData(field, value) {
    if (field === "startPeriod" || field === "endPeriod") {
      const valueDate = value ?? null;
      const startDate = task.startPeriod ?? null;
      const endDate = task.endPeriod ?? null;

      if (field === "startPeriod" && (!endDate || compareDatesOnly(valueDate, endDate) < 0)) {
        setTaskStartPeriod(valueDate);
      };
      if (field === "endPeriod" && (!startDate || compareDatesOnly(valueDate, startDate) > 0)) {
        setTaskEndPeriod(valueDate);
      };
    };
    if (field === "frequenceIntervalDays") {
      setTaskFrequenceIntervalDays(value);
      setTaskFrequenceWeeklyDays(null);
    };
    if (field === "frequenceWeeklyDays") {
      setTaskFrequenceIntervalDays(null);
      setTaskFrequenceWeeklyDays(value);
    };
  };

  useEffect(() => {
    const handleClickOutside = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        if (mode === "SINGLE") {
          const save_isActivityChange = isActivityChange
          setTaskStartPeriod(null);
          setTaskFrequenceIntervalDays(null);
          setTaskFrequenceWeeklyDays(null);
          setIsActivityChange(save_isActivityChange);
        };
        closeModal();
      }
    }
    if (isOpenModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpenModal, mode, task.startPeriod, task.endPeriod, task.frequenceIntervalDays, task.frequenceWeeklyDays]);


  if (!isOpenModal) return null;


  let content;

  if (mode === "SINGLE") {
    content = (
      <div className={styles.finalDate}>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
          <h3>Data Final</h3>
        </div>
        <input
          type="date"
          id="date"
          value={task.endPeriod ? dateToYYYYMMDD(task.endPeriod) : ""}
          onChange={(e) => handleSetData("endPeriod", e.target.value)}
        />
        <button className="button" onClick={() => handleSetData("endPeriod", "")}>Limpar</button>
      </div>
    )
  };


  if (mode === "MULTI") {
    content = (
      <div className={styles.multiContainer}>
        <div>
          <div className={styles.finalDate}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              <h3>Data Inicial</h3>
            </div>
            <input
              type="date"
              id="date"
              value={task.startPeriod ? dateToYYYYMMDD(task.startPeriod) : ""}
              onChange={(e) => handleSetData("startPeriod", e.target.value)}
            />
            <button className="button" onClick={() => handleSetData("startPeriod", "")}>Limpar</button>
          </div>
          <div className={styles.finalDate}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              <h3>Data Final</h3>
            </div>
            <input
              type="date"
              id="date"
              value={task.endPeriod ? dateToYYYYMMDD(task.endPeriod) : ""}
              onChange={(e) => handleSetData("endPeriod", e.target.value)}
            />
            <button className="button" onClick={() => handleSetData("endPeriod", "")}>Limpar</button>
          </div>
          <div className={styles.frequenceIntervalDays}>
            <label htmlFor="frequenceIntervalDays">
              Dias entre cada execução da tarefa:
            </label>
            <input
              id="frequenceIntervalDays"
              type="number"
              min="1"
              placeholder="Ex: 2"
              value={task.frequenceIntervalDays ? task.frequenceIntervalDays : ""}
              onChange={(e) => handleSetData("frequenceIntervalDays", e.target.value)}
            />
          </div>
          <div className={styles.frequenceWeeklyDays}>
            <label>Selecione os dias da semana para repetir a tarefa:</label>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              {DAYS_OF_WEEK.map(day => (
                <button
                  key={day.value}
                  onClick={() => handleSetData("frequenceWeeklyDays", day.value)}
                  className="button"
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    backgroundColor: task.frequenceWeeklyDays?.includes(day.value) ? '#4CAF50' : '#f0f0f0',
                    color: task.frequenceWeeklyDays?.includes(day.value) ? '#fff' : '#333',
                    cursor: 'pointer'
                  }}
                  type="button"
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  };


  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal} ref={modalRef}>
          <div className={styles.buttonOptions}>
            <button
              className="button"
              disabled={mode === "SINGLE"}
              onClick={toggleMode}
            >Tarefa Única</button>
            <button
              className="button"
              disabled={mode === "MULTI"}
              onClick={toggleMode}
            >Tarefas Periódicas</button>
          </div>
          <div>
            {content}
          </div>
        </ div>
      </div>
    </>
  )
};