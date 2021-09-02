import { createContext } from "react";
import { TeaType } from "./firebase";

export type ContextProps = {
  loggedIn: boolean;
  setLoggedIn: () => void;
  teas: TeaType[];
  setTeas: () => void;
  user: any;
  setUser: () => void;
  chosenTea: TeaType;
  setChosenTea: () => void;
};

const AppContext = createContext<ContextProps>();

export default AppContext;
