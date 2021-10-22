import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Context,
} from "react";
import { TeaLeavesType, TeaType } from "./firebase";

export type ContextProps = {
  loggedIn: boolean;
  setLoggedIn: () => void;
  user: any;
  setUser: () => void;
  chosenTea: TeaType;
  setChosenTea: () => void;
  desiredStrength: number;
  setDesiredStrength: () => void;
};

const AppContext = createContext<ContextProps>();

type Action =
  | { type: "black-teas"; payload: TeaType[] }
  | { type: "tea-leaves"; payload: TeaLeavesType[] };
type Dispatch = (action: Action) => void;
type State = {
  blackTeas: TeaType[];
  setBlackTeas: () => void;
  teaLeaves: TeaLeavesType[];
  setTeaLeaves: () => void;
};
type CountProviderProps = { children: ReactNode };

export type ContentContextProps = {
  blackTeas: TeaType[];
  setBlackTeas: () => void;
  teaLeaves: TeaLeavesType[];
  setTeaLeaves: () => void;
};

const ContentContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const contentReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "black-teas": {
      return { blackTeas: action.payload };
    }
    case "tea-leaves": {
      return { teaLeaves: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

function ContentProvider({ children }: CountProviderProps): Context {
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

const useContentContext = (): ContentContext => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    return;
  }
  return context;
};

export default AppContext;
export { ContentProvider, useContentContext };
