import { createContext, useReducer } from "react";


export const AppContext = createContext({
  isOpenModal: null,
  mode: null,
  type: null,
  isInstanceChange: false,
  openModal: () => { },
  closeModal: () => { },
  setMode: () => { },
  setIsInstanceChange: () => { },
});


function appReducer(state, action) {
  if (action.type === 'OPEN_MODAL') {
    return {
      ...state,
      isOpenModal: true,
      mode: action.payload.mode,
      type: action.payload.type,
    };
  };

  if (action.type === 'CLOSE_MODAL') {
    return {
      ...state,
      isOpenModal: false,
      mode: null,
      type: null,
      isInstanceChange: false,
    };
  };

  if (action.type === 'SET_MODE') {
    return { ...state, mode: action.payload }
  };

  if (action.type === 'SET_IS_INSTANCE_CHANGE') {
    return { ...state, isInstanceChange: action.payload }
  }
};



export default function AppContextProvider({ children }) {
  const initialState = {
    isOpenModal: false,
    mode: null,
    type: null,
    isInstanceChange: false,
  };

  const [appState, appDispatch] = useReducer(appReducer, initialState);

  function handleOpenModal(mode, type) {
    appDispatch({ type: 'OPEN_MODAL', payload: { mode, type } });
  };

  function handleCloseModal() {
    appDispatch({ type: 'CLOSE_MODAL' });
  };

  function handleSetMode(mode) {
    appDispatch({ type: 'SET_MODE', payload: mode });
  };

  function handleIsInstanceChange(value) {
    appDispatch({ type: 'SET_IS_INSTANCE_CHANGE', payload: value });
  };


  const ctxValue = {
    isOpenModal: appState.isOpenModal,
    mode: appState.mode,
    type: appState.type,
    isInstanceChange: appState.isInstanceChange,
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
    setMode: handleSetMode,
    setIsInstanceChange: handleIsInstanceChange,
  };

  return <AppContext.Provider value={ctxValue}>
    {children}
  </AppContext.Provider>
};