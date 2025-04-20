import { useMutation } from "@tanstack/react-query";
import { createContext, useReducer } from "react";
import { upsertActivity } from "../api/activities";


export const ModalContext = createContext({
  id: null,
  title: null,
  description: null,
  importance: null,
  difficulty: null,
  keywords: [],
  setTitle: () => { },
  setDescription: () => { },
  setImportance: () => { },
  setDifficulty: () => { },
  save: () => { },
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
};


export default function ModalContextProvider({ children }) {
  const initialState = {
    id: null,
    title: "",
    description: "",
    keywords: [],
    importance: "MEDIUM",
    difficulty: "MEDIUM",
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

  const { mutate } = useMutation({
    mutationFn: upsertActivity,
  });

  function handleSave() {
    const { id, title, description, importance, difficulty, keywords } = activityState;

    const isValidToCreate = (
      title && description && importance && difficulty && keywords.length > 0
    );

    const isValidToUpdate = (
      id && (title || description || importance || difficulty || keywords.length > 0)
    );

    if (isValidToCreate || isValidToUpdate) {
      mutate({ activity: activityState });
    }
    console.log('Activity without ID')
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
    save: handleSave,
  };

  return <ModalContext.Provider value={ctxValue}>
    {children}
  </ModalContext.Provider>
};