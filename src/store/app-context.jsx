import { createContext, useReducer } from "react";


export const AppContext = createContext({
  isOpenModal: null,
  openModal: () => { },
  closeModal: () => { },

});


function appReducer(state, action) {
  if (action.type === 'OPEN_MODAL') {
    return {
      ...state,
      isOpenModal: true,
    };
  };

  if (action.type === 'CLOSE_MODAL') {
    return {
      ...state,
      isOpenModal: false,
    };
  };

}


export default function AppContextProvider({ children }) {
  const initialState = {
    isOpenModal: false,
  };

  const [appState, appDispatch] = useReducer(appReducer, initialState);

  function handleOpenModal() {
    appDispatch({ type: 'OPEN_MODAL' });
  };

  function handleCloseModal() {
    appDispatch({ type: 'CLOSE_MODAL' });
  };


  const ctxValue = {
    isOpenModal: appState.isOpenModal,
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
  };

  return <AppContext.Provider value={ctxValue}>
    {children}
  </AppContext.Provider>
};