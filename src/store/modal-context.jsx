import { createContext, useReducer } from "react";

export const ModalContext = createContext({
  id: null,
  title: null,
  description: null,
  importance: null,
  difficulty: null,
  keywords: [],
  activityType: null,
  task: {
    
  },
  setTitle: () => { },
  setDescription: () => { },
  setImportance: () => { },
  setDifficulty: () => { },
  toggleKeywords: () => { },
  setActivityType: () => { },
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

  if (action.type === 'SET_ACTIVITY_TYPE') {
    return { ...state, activityType: action.payload };
  };

  if (action.type === 'RESET') {
    return {
      id: null,
      title: "",
      description: "",
      importance: "MEDIUM",
      difficulty: "MEDIUM",
      keywords: [],
      activityType: null,
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
    activityType: null,
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

  function handleSetActivityType(activityType) {
    activityDispatch({ type: 'SET_ACTIVITY_TYPE', payload: activityType });
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
    setTitle: handleSetTitle,
    setDescription: handleSetDescription,
    setImportance: handleSetImportance,
    setDifficulty: handleSetDifficulty,
    toggleKeywords: handleToggleKeyword,
    setActivityType: handleSetActivityType,
    reset: handleReset
  };

  return <ModalContext.Provider value={ctxValue}>
    {children}
  </ModalContext.Provider>
};