import React, { createContext, useReducer, useContext, ReactNode } from "react";

export enum ContentActions {
  BlackTeas = "black-teas",
  TeaLeaves = "tea-leaves",
}

type Action =
  | { type: ContentActions.BlackTeas; payload: TeaType[] }
  | { type: ContentActions.TeaLeaves; payload: TeaLeavesType[] };
type Dispatch = (action: Action) => void;
type State = {
  blackTeas: TeaType[];
  setBlackTeas: () => void;
  teaLeaves: TeaLeavesType[];
  setTeaLeaves: () => void;
};

type ContentContextType =
  | {
      state: State;
      dispatch: Dispatch;
    }
  | undefined;

const ContentContext = createContext<ContentContextType>(undefined);

const contentReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ContentActions.BlackTeas: {
      return { ...state, blackTeas: action.payload };
    }
    case ContentActions.TeaLeaves: {
      return { ...state, teaLeaves: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

type ContentProviderProps = {
  children: ReactNode;
};

export function ContentProvider({ children }: ContentProviderProps): Context {
  const [state, dispatch] = useReducer(contentReducer, {
    blackTeas: [],
    teaLeaves: [],
  });
  return (
    <ContentContext.Provider value={{ state, dispatch }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContentContext = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    return;
  }
  return context;
};
