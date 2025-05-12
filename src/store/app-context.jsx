import { createContext, useReducer } from "react";


export const AppContext = createContext({
  isOpenModal: null,
  mode: null,
  type: null,
  openModal: () => { },
  closeModal: () => { },
  setMode: () => { },
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
      type: null
    };
  };

  if (action.type === 'SET_MODE') {
    return { ...state, mode: action.payload }
  };
};



export default function AppContextProvider({ children }) {
  const initialState = {
    isOpenModal: false,
    mode: null,
    type: null,
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


  const ctxValue = {
    isOpenModal: appState.isOpenModal,
    mode: appState.mode,
    type: appState.type,
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
    setMode: handleSetMode,
  };

  return <AppContext.Provider value={ctxValue}>
    {children}
  </AppContext.Provider>
};