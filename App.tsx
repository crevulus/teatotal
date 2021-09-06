import "react-native-gesture-handler";
import React, { useEffect, useState, ReactNode } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";

import * as firebase from "firebase";

import AppContext from "./data/createContext.ts";
import AppContainer from "./components/AppContainer";
import theme from "./styles/theme";

const App = (): ReactNode => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [teas, setTeas] = useState([]);
  const [user, setUser] = useState({});
  const [chosenTea, setChosenTea] = useState({});
  const [desiredStrength, setDesiredStrength] = useState(0.5);

  const { Provider } = AppContext;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setLoggedIn(true);
      }
    });
  });

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Provider
          value={{
            loggedIn,
            setLoggedIn,
            teas,
            setTeas,
            user,
            setUser,
            chosenTea,
            setChosenTea,
            desiredStrength,
            setDesiredStrength,
          }}
        >
          <NativeBaseProvider theme={theme}>
            <AppContainer />
          </NativeBaseProvider>
        </Provider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
