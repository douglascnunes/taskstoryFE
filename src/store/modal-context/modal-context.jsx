import { createContext, useReducer } from "react";
import { CONDICTION, STATUS } from "../../util/enum";


export const ModalContext = createContext({
  id: null,
  title: null,
  description: null,
  importance: null,
  difficulty: null,
  keywords: [],
  type: null,
  task: {
    id: null,
    startPeriod: null,
    endPeriod: null,
    frequenceIntervalDays: null,
    frequenceWeeklyDays: null,
    steps: [],
    instance: {
      id: null,
      finalDate: null,
      completedOn: null,
      status: null,
      stepCompletionStatus: null,
      // priorityEvolved: null,
    }
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
  setTaskSteps: () => { },
  addTaskStep: () => { },
  removeTaskStep: () => { },
  moveTaskStepUp: () => { },
  moveTaskStepDown: () => { },
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
    const activity = action.payload.activity;
    const instance = action.payload.instance;
    const type = String(activity.type).toLocaleLowerCase();
    activity.createdAt = activity.createdAt ? new Date(activity.createdAt) : null;

    if (type === 'task') {
      // console.log('activity:\n', activity)
      // console.log('instance:\n', instance)

      activity.task.instance = activity.task.taskInstances ? activity.task.taskInstances[0] : null;
      activity.task.startPeriod = activity.task.startPeriod ? new Date(activity.task.startPeriod) : "";
      activity.task.endPeriod = activity.task.endPeriod ? new Date(activity.task.endPeriod) : "";
      activity.task.frequenceIntervalDays = activity.task.frequenceIntervalDays ?? "";
      activity.task.frequenceWeeklyDays = activity.task.frequenceWeeklyDays ?? [];
      activity.task.steps = activity.task.steps ?? [];
      activity.task.instance = activity.task.instance ?? instance;
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

      task: {},
      project: {},
      habit: {},
      goal: {},

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

  if (action.type === 'SET_TASK_STEPS') {
    return {
      ...state,
      task: { ...state.task, steps: action.payload }
    };
  };

  if (action.type === 'ADD_TASK_STEP') {
    return {
      ...state, task: {
        ...state.task,
        steps: [...state.task.steps, { id: null, description: action.payload, index: state.task.steps.length }]
      }
    };
  };

  if (action.type === 'REMOVE_TASK_STEP') {
    const updatedSteps = state.task.steps
      .filter((step) => step.index !== action.payload)
      .map((step, newIndex) => ({
        ...step,
        index: newIndex
      }));

    return {
      ...state,
      task: {
        ...state.task,
        steps: updatedSteps
      }
    };
  };

  if (action.type === 'MOVE_TASK_STEP_UP') {
    const idx = action.payload;
    if (idx <= 0) return state;

    const steps = state.task.steps.map(s => ({ ...s }));
    const cur = steps.find(s => s.index === idx);
    const prev = steps.find(s => s.index === idx - 1);
    if (!cur || !prev) return state;

    // Troca os índices
    cur.index--;
    prev.index++;

    // Atualiza stepCompletionStatus
    const completionStatus = [...(state.task.instance.stepCompletionStatus || [])];
    const updatedStatus = completionStatus.map(index => {
      if (index === idx) return idx - 1;
      if (index === idx - 1) return idx;
      return index;
    });

    return {
      ...state,
      task: {
        ...state.task,
        steps,
        instance: {
          ...state.task.instance,
          stepCompletionStatus: updatedStatus
        }
      }
    };
  }

  if (action.type === 'MOVE_TASK_STEP_DOWN') {
    const idx = action.payload;
    const maxIndex = state.task.steps.length - 1;
    if (idx >= maxIndex) return state;

    const steps = state.task.steps.map(s => ({ ...s }));
    const cur = steps.find(s => s.index === idx);
    const next = steps.find(s => s.index === idx + 1);
    if (!cur || !next) return state;

    // Troca os índices
    cur.index++;
    next.index--;

    // Atualiza stepCompletionStatus
    const completionStatus = [...(state.task.instance.stepCompletionStatus || [])];
    const updatedStatus = completionStatus.map(index => {
      if (index === idx) return idx + 1;
      if (index === idx + 1) return idx;
      return index;
    });

    return {
      ...state,
      task: {
        ...state.task,
        steps,
        instance: {
          ...state.task.instance,
          stepCompletionStatus: updatedStatus
        }
      }
    };
  }


  if (action.type === 'TOGGLE_STEP_COMPLETION') {
    const prevStatus = state.task.instance?.stepCompletionStatus || [];
    const index = action.payload;

    const updatedStatus = prevStatus.includes(index)
      ? prevStatus.filter(idx => idx !== index) : [...prevStatus, index];

    return {
      ...state,
      task: {
        ...state.task,
        instance: {
          ...state.task.instance,
          stepCompletionStatus: updatedStatus
        }
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
        id: null,
        startPeriod: "",
        endPeriod: "",
        frequenceIntervalDays: "",
        frequenceWeeklyDays: [],
        steps: [],
        instance: {
          id: null,
          finalDate: "",
          completedOn: "",
          status: null,
          stepCompletionStatus: [],
        }
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
      id: null,
      startPeriod: "",
      endPeriod: "",
      frequenceIntervalDays: "",
      frequenceWeeklyDays: [],
      steps: [],
      instance: {
        id: null,
        finalDate: "",
        completedOn: "",
        status: null,
        stepCompletionStatus: [],
      }
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

  function handleSetTaskSteps(steps) {
    activityDispatch({ type: 'SET_TASK_STEPS', payload: steps })
  };

  function handleAddTaskStep(step) {
    activityDispatch({ type: 'ADD_TASK_STEP', payload: step });
  };

  function handleRemoveTaskStep(index) {
    activityDispatch({ type: 'REMOVE_TASK_STEP', payload: index });
  };

  function handleMoveTaskStepUp(index) {
    activityDispatch({ type: 'MOVE_TASK_STEP_UP', payload: index });
  };

  function handleMoveTaskStepDown(index) {
    activityDispatch({ type: 'MOVE_TASK_STEP_DOWN', payload: index });
  };

  function handleToggleStepCompletion(stepId) {
    activityDispatch({ type: 'TOGGLE_STEP_COMPLETION', payload: stepId });
  };

  function handleLoader(activity, instance) {
    activityDispatch({ type: 'LOADER', payload: { activity, instance } })
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
    setTaskStep: handleSetTaskSteps,
    addTaskStep: handleAddTaskStep,
    moveTaskStepUp: handleMoveTaskStepUp,
    moveTaskStepDown: handleMoveTaskStepDown,
    removeTaskStep: handleRemoveTaskStep,
    toggleStepCompletion: handleToggleStepCompletion,
    reset: handleReset,
  };

  return <ModalContext.Provider value={ctxValue}>
    {children}
  </ModalContext.Provider>
};