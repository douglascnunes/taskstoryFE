import { createContext, useReducer } from "react";
import { updateTaskCondiction } from "../../util/panel/task";
import { yyyymmddToDate } from "../../util/date";
import { cleanToDependency } from "../../util/helpers/activity";


function hasChanged(prev, next) {
  return JSON.stringify(prev) !== JSON.stringify(next);
}



export const ModalContext = createContext({
  id: null,
  title: null,
  description: null,
  importance: null,
  difficulty: null,
  keywords: null,
  type: null,
  dependencies: null,
  task: {
    id: null,
    startPeriod: null,
    endPeriod: null,
    frequenceIntervalDays: null,
    frequenceWeeklyDays: null,
    steps: null,
    instance: {
      id: null,
      finalDate: null,
      completedOn: null,
      status: null,
      stepCompletionStatus: null,
    }
  },
  isActivityChange: false,
  isInstanceChange: false,
  setTitle: () => { },
  setDescription: () => { },
  setImportance: () => { },
  setDifficulty: () => { },
  toggleKeywords: () => { },
  setType: () => { },
  toggleDependencies: () => { },
  loader: () => { },
  setTaskStartPeriod: () => { },
  setTaskEndPeriod: () => { },
  setTaskFrequenceIntervalDays: () => { },
  setTaskFrequenceWeeklyDays: () => { },
  setTaskPeriodFrequency: () => { },
  setTaskSteps: () => { },
  addTaskStep: () => { },
  removeTaskStep: () => { },
  moveTaskStepUp: () => { },
  moveTaskStepDown: () => { },
  setTaskStepDescription: () => { },
  setFinalDate: () => { },
  toggleStepCompletion: () => { },
  setIsActivityChange: () => { },
  setIsInstanceChange: () => { },
  reset: () => { },
});


function activityReducer(state, action) {
  if (action.type === 'SET_TITLE') {
    return {
      ...state,
      isActivityChange: hasChanged(state.title, action.payload),
      title: action.payload
    }
  };

  if (action.type === 'SET_DESCRIPTION') {
    return {
      ...state,
      isActivityChange: hasChanged(state.description, action.payload),
      description: action.payload
    }
  };

  if (action.type === 'SET_IMPORTANCE') {
    return {
      ...state,
      isActivityChange: hasChanged(state.importance, action.payload),
      importance: action.payload
    };
  };

  if (action.type === 'SET_DIFFICULTY') {
    return {
      ...state,
      isActivityChange: hasChanged(state.difficulty, action.payload) || state.isActivityChange,
      difficulty: action.payload
    };
  };


  if (action.type === 'TOGGLE_KEYWORDS') {
    const currentKeywords = state.keywords ?? [];
    const exists = currentKeywords.some(k => k.id === action.payload.id);

    if (exists && currentKeywords.length === 1) {
      return state;
    }

    const newKeywords = exists
      ? currentKeywords.filter(k => k.id !== action.payload.id)
      : [...currentKeywords, action.payload];

    return {
      ...state,
      isActivityChange: JSON.stringify(currentKeywords) !== JSON.stringify(newKeywords) || state.isActivityChange,
      keywords: newKeywords
    };
  }

  if (action.type === 'TOGGLE_DEPENDENCY') {
    const currentDependencies = state.dependencies || [];
 
    if (action.payload.type === "ACTIVITY") {
      const cleanActivity = cleanToDependency(action.payload.activity);
      if (!cleanActivity) {
        return { ...state }
      }
      
      if (cleanActivity.type === "TASK") {
        const hasActivityDependency = currentDependencies.some(d => d.activity?.task?.instance?.id === cleanActivity.task.instance.id);

        if (hasActivityDependency) {
          return {
            ...state,
            isActivityChange: true,
            dependencies: currentDependencies.filter(d => d.activity?.task?.instance?.id !== cleanActivity.task.instance.id),
          };
        }
        const newDependence = {
          index: currentDependencies.length,
          type: action.payload.type || 'ACTIVITY',
          activity: cleanActivity || null,
          description: action.payload.description || null,
        };

        return {
          ...state,
          isActivityChange: true,
          dependencies: [...currentDependencies, newDependence],
        };
      }
    }

    return {
      ...state
    }
  }



  if (action.type === 'SET_TYPE') {
    return {
      ...state,
      isActivityChange: hasChanged(state.type, action.payload) || state.isActivityChange,
      type: action.payload
    };
  }


  if (action.type === 'LOADER') {
    const activity = action.payload.activity;
    const instance = action.payload.instance;
    const type = String(activity.type).toLocaleLowerCase();
    activity.createdAt = activity.createdAt ? new Date(activity.createdAt) : null;

    if (type === 'task') {
      activity.task.instance = activity.task.taskInstances ? activity.task.taskInstances[0] : null;
      activity.task.startPeriod = activity.task.startPeriod ? new Date(activity.task.startPeriod) : null;
      activity.task.endPeriod = activity.task.endPeriod ? new Date(activity.task.endPeriod) : null;
      activity.task.frequenceIntervalDays = activity.task.frequenceIntervalDays ?? null;
      activity.task.frequenceWeeklyDays = activity.task.frequenceWeeklyDays ?? null;
      activity.task.steps = activity.task.steps ?? null;
      activity.task.instance = activity.task.instance ?? instance;
      activity.task.instance.condiction = updateTaskCondiction(activity);
    };
  
    return {
      ...state,
      id: activity.id,
      title: activity.title,
      description: activity.description,
      importance: activity.importance,
      difficulty: activity.difficulty,
      keywords: activity.keywords || [],
      dependencies: activity.dependencies || [],
      type,
      isActivityChange: false,
      isInstanceChange: false,

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
    const newValue = action.payload ? yyyymmddToDate(action.payload) : null;
    return {
      ...state,
      isActivityChange: hasChanged(state.task.startPeriod, newValue),
      task: {
        ...state.task,
        startPeriod: newValue
      }
    };
  }

  if (action.type === 'SET_TASK_END_PERIOD') {
    const newValue = action.payload ? yyyymmddToDate(action.payload) : null;
    return {
      ...state,
      isActivityChange: hasChanged(state.task.endPeriod, newValue),
      task: {
        ...state.task,
        endPeriod: newValue
      }
    };
  };

  if (action.type === 'SET_TASK_FREQUENCE_INTERVAL_DAYS') {
    return {
      ...state,
      isActivityChange: hasChanged(state.task.frequenceIntervalDays, action.payload),
      task: {
        ...state.task,
        frequenceIntervalDays: action.payload
      }
    };
  }

  if (action.type === 'SET_TASK_FREQUENCE_WEEKLY_DAYS') {
    if (action.payload === null) {
      const frequenceWeeklyDays = state.task.frequenceWeeklyDays;
      return {
        ...state,
        isActivityChange: hasChanged(frequenceWeeklyDays, []),
        task: {
          ...state.task,
          frequenceWeeklyDays: [],
        }
      };
    }

    const days = state.task.frequenceWeeklyDays || [];
    const updated = days.includes(action.payload)
      ? days.filter(d => d !== action.payload)
      : [...days, action.payload];

    return {
      ...state,
      isActivityChange: hasChanged(days, updated),
      task: {
        ...state.task,
        frequenceWeeklyDays: updated,
      }
    };
  };

  if (action.type === 'SET_TASK_PERIOD_FREQUENCY') {
    return {
      ...state,
      isActivityChange: hasChanged(
        {
          startPeriod: state.task.startPeriod,
          endPeriod: state.task.endPeriod,
          frequenceIntervalDays: state.task.frequenceIntervalDays,
          frequenceWeeklyDays: state.task.frequenceWeeklyDays
        },
        {
          ...state.task,
          ...action.payload
        }
      ),
      task: {
        ...state.task,
        ...action.payload
      }
    };
  }

  if (action.type === 'SET_TASK_STEPS') {
    return {
      ...state,
      isActivityChange: hasChanged(state.task.steps, action.payload),
      task: {
        ...state.task,
        steps: action.payload
      }
    };
  }

  if (action.type === 'ADD_TASK_STEP') {
    const newSteps = [
      ...state.task.steps || [],
      {
        id: null,
        description: action.payload,
        index: state.task.steps?.length || 0
      }
    ];
    return {
      ...state,
      isActivityChange: true,
      task: {
        ...state.task,
        steps: newSteps
      }
    };
  }

  if (action.type === 'REMOVE_TASK_STEP') {
    const updatedSteps = state.task.steps
      .filter(step => step.index !== action.payload)
      .map((step, newIndex) => ({
        ...step,
        index: newIndex
      }));

    return {
      ...state,
      isActivityChange: true,
      task: {
        ...state.task,
        steps: updatedSteps
      }
    };
  }

  if (action.type === 'MOVE_TASK_STEP_UP') {
    const idx = action.payload;
    if (idx <= 0) return state;

    const steps = state.task.steps.map(s => ({ ...s }));
    const cur = steps.find(s => s.index === idx);
    const prev = steps.find(s => s.index === idx - 1);
    if (!cur || !prev) return state;

    cur.index--;
    prev.index++;

    return {
      ...state,
      isActivityChange: true,
      task: {
        ...state.task,
        steps,
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

    cur.index++;
    next.index--;

    return {
      ...state,
      isActivityChange: true,
      task: {
        ...state.task,
        steps,
      }
    };
  }


  if (action.type === "SET_TASK_STEP_DESCRIPTION") {
    const { mode, identifier, description } = action.payload;

    const prevStep = state.task.steps.find(step =>
      mode === 'index' ? false : step.id === identifier
    ) || {};

    let updatedSteps = [];

    if (mode === 'index') {
      const index = identifier;
      updatedSteps = state.task.steps.map((step, idx) => {
        if (idx === index) {
          return {
            ...step,
            description: description,
          };
        }
        return step;
      });
    } else {
      updatedSteps = state.task.steps.map(step => {
        if (step.id === identifier) {
          return {
            ...step,
            description: description,
          };
        }
        return step;
      });
    }

    return {
      ...state,
      isActivityChange: hasChanged(prevStep.description, description),
      task: {
        ...state.task,
        steps: updatedSteps,
      },
    };
  };



  if (action.type === 'SET_TASK_FINAL_DATE') {
    return {
      ...state,
      isActivityChange: hasChanged(state.task.instance?.finalDate, action.payload),
      task: {
        ...state.task,
        instance: {
          ...state.task.instance,
          finalDate: action.payload
        }
      }
    };
  }


  if (action.type === 'TOGGLE_STEP_COMPLETION') {
    const prevStatus = state.task.instance?.stepCompletionStatus || [];
    const stepId = action.payload;

    const updatedStatus = prevStatus.includes(stepId)
      ? prevStatus.filter(id => id !== stepId) : [...prevStatus, stepId];

    return {
      ...state,
      isInstanceChange: true,
      task: {
        ...state.task,
        instance: {
          ...state.task.instance,
          stepCompletionStatus: updatedStatus
        }
      }
    };
  };

  if (action.type === 'SET_ISACTIVITYCHANGE') {
    return { ...state, isActivityChange: action.payload, }
  };

  if (action.type === 'SET_ISINSTANCECHANGE') {
    return { ...state, isInstanceChange: action.payload, }
  };


  if (action.type === 'RESET') {
    return {
      id: null,
      title: null,
      description: null,
      importance: "MEDIUM",
      difficulty: "MEDIUM",
      keywords: null,
      type: null,
      task: {
        id: null,
        startPeriod: null,
        endPeriod: null,
        frequenceIntervalDays: null,
        frequenceWeeklyDays: null,
        steps: null,
        instance: {
          id: null,
          finalDate: null,
          completedOn: null,
          status: null,
          stepCompletionStatus: null,
        }
      },
      isActivityChange: false,
      isInstanceChange: false,
    };
  }
};





export default function ModalContextProvider({ children }) {
  const initialState = {
    id: null,
    title: null,
    description: null,
    importance: "MEDIUM",
    difficulty: "MEDIUM",
    keywords: null,
    dependencies: null,
    type: null,
    task: {
      id: null,
      startPeriod: null,
      endPeriod: null,
      frequenceIntervalDays: null,
      frequenceWeeklyDays: null,
      steps: null,
      instance: {
        id: null,
        finalDate: null,
        completedOn: null,
        status: null,
        stepCompletionStatus: null,
      }
    },
    isActivityChange: false,
    isInstanceChange: false,
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

  function handleToggleDependencies(type, activity, description) {
    activityDispatch({ type: 'TOGGLE_DEPENDENCY', payload: { type, activity, description } });
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

  function handleSetTaskPeriodFrequency(periodFrequencyValues) {
    activityDispatch({ type: 'SET_TASK_PERIOD_FREQUENCY', payload: periodFrequencyValues });
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

  function handleSetTaskStepDescription(mode, identifier, newDescription) {
    activityDispatch({ type: "SET_TASK_STEP_DESCRIPTION", payload: { mode: mode, identifier: identifier, description: newDescription } });
  }

  function handleToggleStepCompletion(stepId) {
    activityDispatch({ type: 'TOGGLE_STEP_COMPLETION', payload: stepId });
  };

  function handleSetFinalDate(finalDate) {
    activityDispatch({ type: 'SET_TASK_FINAL_DATE', payload: finalDate });
  };

  function handleLoader(activity, instance) {
    activityDispatch({ type: 'LOADER', payload: { activity, instance } })
  };

  function handleSetIsActivityChange(value) {
    activityDispatch({ type: 'SET_ISACTIVITYCHANGE', payload: value })
  };

  function handleSetIsInstanceChange(value) {
    activityDispatch({ type: 'SET_ISINSTANCECHANGE', payload: value })
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
    dependencies: activityState.dependencies,
    type: activityState.type,
    task: activityState.task,
    isActivityChange: activityState.isActivityChange,
    isInstanceChange: activityState.isInstanceChange,
    setTitle: handleSetTitle,
    setDescription: handleSetDescription,
    setImportance: handleSetImportance,
    setDifficulty: handleSetDifficulty,
    toggleKeywords: handleToggleKeyword,
    toggleDependencies: handleToggleDependencies,
    setType: handleSetType,
    loader: handleLoader,
    // TASK REDUCERS
    setTaskStartPeriod: handleSetTaskStartPeriod,
    setTaskEndPeriod: handleSetTaskEndPeriod,
    setTaskFrequenceIntervalDays: handleSetTaskFrequenceIntervalDays,
    setTaskFrequenceWeeklyDays: handleSetTaskFrequenceWeeklyDays,
    setTaskPeriodFrequency: handleSetTaskPeriodFrequency,
    setTaskSteps: handleSetTaskSteps,
    addTaskStep: handleAddTaskStep,
    moveTaskStepUp: handleMoveTaskStepUp,
    moveTaskStepDown: handleMoveTaskStepDown,
    setTaskStepDescription: handleSetTaskStepDescription,
    removeTaskStep: handleRemoveTaskStep,
    setFinalDate: handleSetFinalDate,
    toggleStepCompletion: handleToggleStepCompletion,
    setIsActivityChange: handleSetIsActivityChange,
    setIsInstanceChange: handleSetIsInstanceChange,
    reset: handleReset,
  };

  return <ModalContext.Provider value={ctxValue}>
    {children}
  </ModalContext.Provider>
};