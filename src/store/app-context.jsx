import { createContext, useReducer } from "react";
import { compareDatesOnly } from '../util/date.js';


function getInitialDateFilter() {
  let start = new Date();
  start.setMonth(start.getMonth() - 2);
  let end = new Date();
  end.setMonth(end.getMonth() + 2);
  return {
    startDate: start,
    endDate: end,
  };
};



export const AppContext = createContext({
  user: null,
  isOpenModal: null,
  mode: null,
  type: null,
  startDate: null,
  endDate: null,
  filterCondictions: null,
  filterPriorities: null,
  filterKeywords: null,
  loadUser: () => { },
  openModal: () => { },
  closeModal: () => { },
  setMode: () => { },
  setFilterDate: () => { },
  toggleFilterCondiction: () => { },
});


function appReducer(state, action) {
  if (action.type === 'LOAD_USER') {
    return { ...state, user: action.payload };
  };

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
    };
  };


  if (action.type === 'SET_MODE') {
    return { ...state, mode: action.payload }
  };


  if (action.type === 'SET_FILTER_DATE') {
    const { type, date } = action.payload;
    const newDate = new Date(date);

    if (type === 'start' && compareDatesOnly(newDate, state.endDate) < 0) {
      return { ...state, startDate: newDate };
    }

    if (type === 'end' && compareDatesOnly(newDate, state.startDate) > 0) {
      return { ...state, endDate: newDate };
    }

    return state;
  }

  if (action.type === 'TOGGLE_FILTER_CONDICTION') {
    const key = action.payload;
    const current = state.filterCondictions || [];

    const updated = current.includes(key)
      ? current.filter(item => item !== key)
      : [...current, key];

    return { ...state, filterCondictions: updated };
  }


  if (action.type === 'TOGGLE_FILTER_PRIORITY') {
    return { ...state, mode: action.payload }
  };

  if (action.type === 'TOGGLE_FILTER_KEYWORD') {
    return { ...state, mode: action.payload }
  };
};



export default function AppContextProvider({ children }) {
  const initialFilter = getInitialDateFilter();

  const initialState = {
    user: null,
    startDate: initialFilter.startDate,
    endDate: initialFilter.endDate,
    filterCondictions: [],
    filterPriorities: [],
    filterKeywords: [],
    isOpenModal: false,
    mode: null,
    type: null,
  };

  const [appState, appDispatch] = useReducer(appReducer, initialState);

  function handleLoadUser(user) {
    appDispatch({ type: 'LOAD_USER', payload: user });
  };

  function handleOpenModal(mode, type) {
    appDispatch({ type: 'OPEN_MODAL', payload: { mode, type } });
  };

  function handleCloseModal() {
    appDispatch({ type: 'CLOSE_MODAL' });
  };

  function handleSetMode(mode) {
    appDispatch({ type: 'SET_MODE', payload: mode });
  };

  function handleSetFilterDate(type, date) {
    appDispatch({ type: 'SET_FILTER_DATE', payload: { type, date } });
  };

  function handleToggleFilterCondiction(value) {
    appDispatch({ type: 'TOGGLE_FILTER_CONDICTION', payload: value });
  };


  const ctxValue = {
    user: appState.user,
    isOpenModal: appState.isOpenModal,
    mode: appState.mode,
    type: appState.type,
    startDate: appState.startDate,
    endDate: appState.endDate,
    filterCondictions: appState.filterCondictions,
    filterPriorities: appState.filterPriorities,
    filterKeywords: appState.filterKeywords,
    loadUser: handleLoadUser,
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
    setMode: handleSetMode,
    setFilterDate: handleSetFilterDate,
    toggleFilterCondiction: handleToggleFilterCondiction
  };

  return <AppContext.Provider value={ctxValue}>
    {children}
  </AppContext.Provider>
};