import { createContext, useReducer } from "react";


export const OnboardingContext = createContext({
  answers: [],
  accountType: null,
  areaOfLife: {
    desirable: [],
    mostPracticed: [],
  },
  onAnswer: () => { },
  updateAccountType: () => { },
  updateAreOfLifeChoices: () => { },
});


function onboardingReducer(state, action) {
  if (action.type === 'ANSWER') {
    const prevAnwers = [...state.answers]
    const [type, idx, choice] = action.payload;
    const updatedAnswers = prevAnwers.map(([t, existingIndex, c]) =>
      existingIndex === idx ? [type, idx, choice] : [t, existingIndex, c]
    );

    const hasAnswered = prevAnwers.some(([_, existingIndex]) => existingIndex === idx);
    const newAnswers = hasAnswered ? updatedAnswers : [...prevAnwers, [type, idx, choice]];

    return {
      ...state,
      answers: newAnswers,
    };
  }

  if (action.type === 'ACCOUNT_TYPE_CHOICE') {
    console.log(action.payload)
    return {
      ...state,
      accountType: action.payload,
    };
  }

  if (action.type === 'UPDATE_AREAOFLIFE') {
    const { type, selected } = action.payload;
    const key = type === 'DESIRABLE' ? 'desirable' : 'mostPracticed';
    const prevAreaOfLife = state.areaOfLife[key];

    if (prevAreaOfLife.includes(selected)) {
      return {
        ...state,
        areaOfLife: {
          ...state.areaOfLife,
          [key]: prevAreaOfLife.filter(area => area !== selected),
        },
      };
    }

    if (prevAreaOfLife.length === 3) {
      return state;
    }

    return {
      ...state,
      areaOfLife: {
        ...state.areaOfLife,
        [key]: [...prevAreaOfLife, selected],
      },
    };
  }
}


export default function OnboardingContextProvider({ children }) {
  const initialState = {
    answers: [],
    accountType: null,
    areaOfLife: {
      desirable: [],
      mostPracticed: [],
    },
  };

  const [onboradingState, onboardingDispatch] = useReducer(onboardingReducer, initialState);

  function handleOnAnswer(type, idx, choice) {
    onboardingDispatch({
      type: 'ANSWER', payload: [type, idx, choice]
    });
  };

  function handleAcountTypeChoice(choice) {
    onboardingDispatch({
      type: 'ACCOUNT_TYPE_CHOICE', payload: choice
    });
  };

  function handleUpdateAreaofLife(type, selected) {
    onboardingDispatch({
      type: 'UPDATE_AREAOFLIFE', payload: { type, selected }
    });
  };

  const ctxValue = {
    answers: onboradingState.answers,
    accountType: onboradingState.accountType,
    areaOfLife: onboradingState.areaOfLife,
    onAnswer: handleOnAnswer,
    updateAccountType: handleAcountTypeChoice,
    updateAreOfLifeChoices: handleUpdateAreaofLife,
  };

  return <OnboardingContext.Provider value={ctxValue}>
    {children}
  </OnboardingContext.Provider>
};