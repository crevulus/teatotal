// @ts-nocheck
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import * as firebase from "firebase";

import AppContext from "./data/createContext.js";
import AppContainer from "./components/AppContainer";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [teas, setTeas] = useState([]);

  const { Provider } = AppContext;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      }
    });
  });

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Provider value={{ loggedIn, setLoggedIn, teas, setTeas }}>
          <AppContainer />
        </Provider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
