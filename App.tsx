import "react-native-gesture-handler";
import React, { useEffect, useState, ReactNode } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider, extendTheme } from "native-base";

import * as firebase from "firebase";

import AppContext from "./data/createContext.ts";
import AppContainer from "./components/AppContainer";

const App = (): ReactNode => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [teas, setTeas] = useState([]);
  const [user, setUser] = useState({});
  const [chosenTea, setChosenTea] = useState({});

  const { Provider } = AppContext;

  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: "#E3F2F9",
        100: "#C5E4F3",
        200: "#A2D4EC",
        300: "#7AC1E4",
        400: "#47A9DA",
        500: "#0088CC",
        600: "#007AB8",
        700: "#006BA1",
        800: "#005885",
        900: "#003F5E",
      },
      // Redefinig only one shade, rest of the color will remain same.
      amber: {
        400: "#d97706",
      },
    },
  });

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
