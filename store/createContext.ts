import { createContext } from "react";
import { ContentProvider, useContentContext } from "./ContentContext.tsx";
import {
  TeaSettingsProvider,
  useTeaSettingsContext,
} from "./TeaSettingsContext.tsx";

export type ContextProps = {
  loggedIn: boolean;
  setLoggedIn: () => void;
  user: any;
  setUser: () => void;
};

const AppContext = createContext<ContextProps>();

export default AppContext;
export {
  ContentProvider,
  useContentContext,
  TeaSettingsProvider,
  useTeaSettingsContext,
};
