import React, { createContext, useReducer, useContext } from "react";

export enum TeaSettingsActions {
  ChooseTea = "choose-tea",
  ChangeStrength = "change-strength",
}

type Action =
  | { type: TeaSettingsActions.ChooseTea; payload: TeaType }
  | { type: TeaSettingsActions.ChangeStrength; payload: number };
type Dispatch = (action: Action) => void;
type State = {
  chosenTea: TeaType;
  setChosenTea: () => void;
  desiredStrength: number;
  setDesiredStrength: () => void;
};

const TeaSettingsContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const teaSettingsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case TeaSettingsActions.ChooseTea: {
      return { ...state, chosenTea: action.payload };
    }
    case TeaSettingsActions.ChangeStrength: {
      return { ...state, desiredStrength: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

type TeaSettingsProviderProps = {
  children: ReactNode;
};

export function TeaSettingsProvider({
  children,
}: TeaSettingsProviderProps): Context {
  const [state, dispatch] = useReducer(teaSettingsReducer, {
    chosenTea: {},
    desiredStrength: 0.5,
  });
  return (
    <TeaSettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </TeaSettingsContext.Provider>
  );
}

export const useTeaSettingsContext = (): TeaSettingsContext => {
  const context = useContext(TeaSettingsContext);
  if (context === undefined) {
    return;
  }
  return context;
};
