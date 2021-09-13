import { createContext } from "react";
import { TeaType } from "./firebase";

export type ContextProps = {
  loggedIn: boolean;
  setLoggedIn: () => void;
  blackTeas: TeaType[];
  setBlackTeas: () => void;
  user: any;
  setUser: () => void;
  chosenTea: TeaType;
  setChosenTea: () => void;
  desiredStrength: number;
  setDesiredStrength: () => void;
};

const AppContext = createContext<ContextProps>();

export default AppContext;
