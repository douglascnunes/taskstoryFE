import { useContext, useEffect, useRef, useState } from 'react';
import styles from './DateModal.module.css';
import { ModalContext } from '../../../../store/modal-context/modal-context.jsx';
import { dateToYYYYMMDD, yyyymmddToDate } from '../../../../util/date.js';
import { DAYS_OF_WEEK } from '../../../../util/enum.js';


export default function DateModal({ isOpenModal, closeModal }) {
  const { task } = useContext(ModalContext);
  const [mode, setMode] = useState(
    (task.frequenceIntervalDays == true || task.frequenceWeeklyDays == true) ? 'MULTI' : 'SINGLE')
  const [date, setDate] = useState({
    startPeriod: task.startPeriod ?? "",
    endPeriod: task.endPeriod ?? "",
    frequenceIntervalDays: task.frequenceIntervalDays ?? "",
    frequenceWeeklyDays: task.frequenceWeeklyDays ?? [],
  });
  const modalRef = useRef();

  function clearDate() {
    setDate({
      startPeriod: task.startPeriod ?? "",
      endPeriod: task.endPeriod ?? "",
      frequenceIntervalDays: task.frequenceIntervalDays ?? "",
      frequenceWeeklyDays: task.frequenceWeeklyDays ?? [],
    });
  };

  function toggleMode() {
    setMode(prev => prev === "SINGLE" ? "MULTI" : "SINGLE")
  };

  function handleSetData(field, value) {
    if (field === "startPeriod" || field === "endPeriod") {
      const valueDate = value ? yyyymmddToDate(value) : null;
      const startDate = date.startPeriod ? new Date(date.startPeriod) : null;
      const endDate = date.endPeriod ? new Date(date.endPeriod) : null;

      if (field === "startPeriod" && (!endDate || valueDate < endDate)) {
        setDate(prev => ({ ...prev, startPeriod: valueDate }));
      };
      if (field === "endPeriod" && (!startDate || valueDate > startDate)) {
        setDate(prev => ({ ...prev, endPeriod: valueDate }));
      };
    };
    if (field === "frequenceIntervalDays") {
      setDate(prev => { return { ...prev, frequenceIntervalDays: value, frequenceWeeklyDays: [] } });
    };
    if (field === "frequenceWeeklyDays") {
      setDate(prev => {
        return {
          ...prev, frequenceIntervalDays: "",
          frequenceWeeklyDays: date.frequenceWeeklyDays.includes(value) ?
            date.frequenceWeeklyDays.filter(d => d !== value) : [...date.frequenceWeeklyDays, value]
        };
      });
    };
  };

  useEffect(() => {
    const handleClickOutside = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };
    if (isOpenModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpenModal]);


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
          value={date.endPeriod ? dateToYYYYMMDD(date.endPeriod) : ""}
          onChange={(e) => handleSetData("endPeriod", e.target.value)}
        />
        <button onClick={() => handleSetData("endPeriod", "")}>Limpar</button>
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
              value={dateToYYYYMMDD(date.startPeriod)}
              onChange={(e) => handleSetData("startPeriod", e.target.value)}
            />
            <button onClick={() => handleSetData("startPeriod", "")}>Limpar</button>
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
              value={dateToYYYYMMDD(date.endPeriod)}
              onChange={(e) => handleSetData("endPeriod", e.target.value)}
            />
            <button onClick={() => handleSetData("endPeriod", "")}>Limpar</button>
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
              value={date.frequenceIntervalDays}
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
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    backgroundColor: date.frequenceWeeklyDays?.includes(day.value) ? '#4CAF50' : '#f0f0f0',
                    color: date.frequenceWeeklyDays?.includes(day.value) ? '#fff' : '#333',
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
              disabled={mode === "SINGLE"}
              onClick={toggleMode}
            >Tarefa Única</button>
            <button
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