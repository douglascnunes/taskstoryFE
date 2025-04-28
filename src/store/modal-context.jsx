import { createContext, useReducer } from "react";


export const ModalContext = createContext({
  id: null,
  title: null,
  description: null,
  importance: null,
  difficulty: null,
  keywords: [],
  type: null,
  task: {
    startPeriod: null,
    endPeriod: null,
    frequenceIntervalDays: null,
    frequenceWeeklyDays: null,
    steps: [],
  },
  setTitle: () => { },
  setDescription: () => { },
  setImportance: () => { },
  setDifficulty: () => { },
  toggleKeywords: () => { },
  setType: () => { },
  setTaskStartPeriod: () => { },
  setTaskEndPeriod: () => { },
  setTaskFrequenceIntervalDays: () => { },
  setTaskFrequenceWeeklyDays: () => { },
  reset: () => { },
});


function activityReducer(state, action) {
  if (action.type === 'SET_TITLE') {
    return { ...state, title: action.payload }
  };

  if (action.type === 'SET_DESCRIPTION') {
    return { ...state, description: action.payload }
  };

  if (action.type === 'SET_IMPORTANCE') {
    return { ...state, importance: action.payload };
  };

  if (action.type === 'SET_DIFFICULTY') {
    return { ...state, difficulty: action.payload };
  };

  if (action.type === 'TOGGLE_KEYWORDS') {
    const exists = state.keywords.some(k => k.id === action.payload.id);
    return {
      ...state,
      keywords: exists
        ? state.keywords.filter(k => k.id !== action.payload.id)
        : [...state.keywords, action.payload],
    };
  };

  if (action.type === 'SET_TYPE') {
    return { ...state, type: action.payload };
  };

  if (action.type === 'SET_TASK_START_PERIOD') {
    return { ...state, task: { ...state.task, startPeriod: action.payload } };
  };

  if (action.type === 'SET_TASK_END_PERIOD') {
    return { ...state, task: { ...state.task, endPeriod: action.payload } };
  };

  if (action.type === 'SET_TASK_FREQUENCE_INTERVAL_DAYS') {
    return { ...state, task: { ...state.task, frequenceIntervalDays: action.payload } };
  };

  if (action.type === 'SET_TASK_FREQUENCE_WEEKLY_DAYS') {
    return { ...state, task: { ...state.task, frequenceWeeklyDays: action.payload } };
  };

  if (action.type === 'RESET') {
    return {
      id: null,
      title: "",
      description: "",
      importance: "MEDIUM",
      difficulty: "MEDIUM",
      keywords: [],
      type: null,
      task: {
        startPeriod: "",
        endPeriod: "",
        frequenceIntervalDays: null,
        frequenceWeeklyDays: [],
        steps: [],
      },
    };
  }
};


export default function ModalContextProvider({ children }) {
  const initialState = {
    id: null,
    title: "",
    description: "",
    importance: "MEDIUM",
    difficulty: "MEDIUM",
    keywords: [],
    type: null,
    task: {
      startPeriod: "",
      endPeriod: "",
      frequenceIntervalDays: "",
      frequenceWeeklyDays: [],
      steps: [],
    },
  };


  const [activityState, activityDispatch] = useReducer(activityReducer, initialState);

  function handleSetTitle(title) {
    activityDispatch({ type: 'SET_TITLE', payload: title });
  };

  function handleSetDescription(description) {
    activityDispatch({ type: 'SET_DESCRIPTION', payload: description });
  };

  function handleSetImportance(importance) {
    activityDispatch({ type: 'SET_IMPORTANCE', payload: importance });
  };

  function handleSetDifficulty(difficulty) {
    activityDispatch({ type: 'SET_DIFFICULTY', payload: difficulty });
  };

  function handleToggleKeyword(keyword) {
    activityDispatch({ type: 'TOGGLE_KEYWORDS', payload: keyword });
  };

  function handleSetType(type) {
    activityDispatch({ type: 'SET_TYPE', payload: type });
  };

  function handleSetTaskStartPeriod(startPeriod) {
    activityDispatch({ type: 'SET_TASK_START_PERIOD', payload: startPeriod });
  };

  function handleSetTaskEndPeriod(endPeriod) {
    activityDispatch({ type: 'SET_TASK_END_PERIOD', payload: endPeriod });
  };

  function handleSetTaskFrequenceIntervalDays(frequenceIntervalDays) {
    activityDispatch({ type: 'SET_TASK_FREQUENCE_INTERVAL_DAYS', payload: frequenceIntervalDays });
  };

  function handleSetTaskFrequenceWeeklyDays(frequenceWeeklyDays) {
    activityDispatch({ type: 'SET_TASK_FREQUENCE_WEEKLY_DAYS', payload: frequenceWeeklyDays });
  };

  function handleReset() {
    activityDispatch({ type: 'RESET' });
  };

  const ctxValue = {
    id: activityState.id,
    title: activityState.title,
    description: activityState.description,
    importance: activityState.importance,
    difficulty: activityState.difficulty,
    keywords: activityState.keywords,
    task: activityState.task,
    setTitle: handleSetTitle,
    setDescription: handleSetDescription,
    setImportance: handleSetImportance,
    setDifficulty: handleSetDifficulty,
    toggleKeywords: handleToggleKeyword,
    setType: handleSetType,
    // TASK REDUCERS
    setTaskStartPeriod: handleSetTaskStartPeriod,
    setTaskEndPeriod: handleSetTaskEndPeriod,
    setTaskFrequenceIntervalDays: handleSetTaskFrequenceIntervalDays,
    setTaskFrequenceWeeklyDays: handleSetTaskFrequenceWeeklyDays,
    reset: handleReset
  };

  return <ModalContext.Provider value={ctxValue}>
    {children}
  </ModalContext.Provider>
};