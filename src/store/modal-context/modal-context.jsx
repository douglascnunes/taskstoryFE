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
    stepCompletionStatus: null,
  },
  setTitle: () => { },
  setDescription: () => { },
  setImportance: () => { },
  setDifficulty: () => { },
  toggleKeywords: () => { },
  setType: () => { },
  loader: () => { },
  setTaskStartPeriod: () => { },
  setTaskEndPeriod: () => { },
  setTaskFrequenceIntervalDays: () => { },
  setTaskFrequenceWeeklyDays: () => { },
  addTaskStep: () => { },
  removeTaskStep: () => { },
  toggleStepCompletion: () => { },
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

  if (action.type === 'LOADER') {
    const activity = action.payload;
    const type = String(activity.type).toLocaleLowerCase();

    activity.createAt = activity.createAt ? new Date(activity.createAt) : null;

    if (type === 'task') {
      activity.task.startPeriod = activity.task.startPeriod ? new Date(activity.task.startPeriod) : "";
      activity.task.endPeriod = activity.task.endPeriod ? new Date(activity.task.endPeriod) : "";
      activity.task.frequenceIntervalDays = activity.task.frequenceIntervalDays ?? "";
      activity.task.frequenceWeeklyDays = activity.task.frequenceWeeklyDays ?? [];
      activity.task.stepCompletionStatus = activity.task.stepCompletionStatus ?? [];
      activity.task.steps = activity.task.steps ?? [];
    };


    return {
      ...state,
      id: activity.id,
      title: activity.title,
      description: activity.description,
      importance: activity.importance,
      difficulty: activity.difficulty,
      keywords: activity.keywords || [],
      type,

      // zera todos os tipos conhecidos primeiro, mantendo a estrutura limpa
      task: {},
      project: {},
      habit: {},
      goal: {},

      // popula dinamicamente com base no type (ex: task: {...})
      [type]: {
        ...(activity[type] || {})
      }
    };
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

  if (action.type === 'ADD_TASK_STEP') {
    return {
      ...state, task: {
        ...state.task,
        steps: [...state.task.steps, { id: null, description: action.payload }]
      }
    };
  };

  if (action.type === 'REMOVE_TASK_STEP') {
    return {
      ...state, task: {
        ...state.task,
        steps: state.task.steps.filter((_, i) => i !== action.payload)
      }
    };
  };


  if (action.type === 'TOGGLE_STEP_COMPLETION') {
    const prevStatus = state.task.stepCompletionStatus || [];
    const stepId = action.payload;

    const updatedStatus = prevStatus.includes(stepId)
      ? prevStatus.filter(id => id !== stepId) : [...prevStatus, stepId];

    return {
      ...state,
      task: {
        ...state.task,
        stepCompletionStatus: updatedStatus
      }
    };
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
        stepCompletionStatus: [],
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
      stepCompletionStatus: [],
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

  function handleAddTaskStep(step) {
    activityDispatch({ type: 'ADD_TASK_STEP', payload: step });
  };

  function handleRemoveTaskStep(index) {
    activityDispatch({ type: 'REMOVE_TASK_STEP', payload: index });
  };

  function handleToggleStepCompletion(stepId) {
    activityDispatch({ type: 'TOGGLE_STEP_COMPLETION', payload: stepId });
  };

  function handleLoader(activity) {
    activityDispatch({ type: 'LOADER', payload: activity })
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
    type: activityState.type,
    task: activityState.task,
    setTitle: handleSetTitle,
    setDescription: handleSetDescription,
    setImportance: handleSetImportance,
    setDifficulty: handleSetDifficulty,
    toggleKeywords: handleToggleKeyword,
    setType: handleSetType,
    loader: handleLoader,
    // TASK REDUCERS
    setTaskStartPeriod: handleSetTaskStartPeriod,
    setTaskEndPeriod: handleSetTaskEndPeriod,
    setTaskFrequenceIntervalDays: handleSetTaskFrequenceIntervalDays,
    setTaskFrequenceWeeklyDays: handleSetTaskFrequenceWeeklyDays,
    addTaskStep: handleAddTaskStep,
    removeTaskStep: handleRemoveTaskStep,
    toggleStepCompletion: handleToggleStepCompletion,
    reset: handleReset,
  };

  return <ModalContext.Provider value={ctxValue}>
    {children}
  </ModalContext.Provider>
};